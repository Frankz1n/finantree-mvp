import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { media } from '@/styles/media'
import { Check, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { AddCommitmentModal, EditableCommitment } from '@/components/modals/AddCommitmentModal/AddCommitmentModal'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useMoneyFormat } from '@/hooks/useMoneyFormat'
import { appLanguageToBcp47 } from '@/lib/i18nLocale'

type CommitmentType = 'subscription' | 'installment'

type Commitment = {
  id: string
  user_id: string
  type: CommitmentType
  name: string
  amount: number
  next_charge_date: string
  total_installments: number | null
  current_installment: number | null
  created_at: string
}

export function Recurring() {
  const { t, i18n } = useTranslation()
  const formatMoney = useMoneyFormat()
  const intlLocale = useMemo(() => appLanguageToBcp47(i18n.language), [i18n.language])

  const formatChargeDate = (date: string) => {
    if (!date) return t('recurring.dateUnavailable')
    return new Intl.DateTimeFormat(intlLocale, {
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`))
  }

  const { user } = useAuth()
  const [commitments, setCommitments] = useState<Commitment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddCommitmentModalOpen, setIsAddCommitmentModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<EditableCommitment | null>(null)
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null)
  const [payingInstallmentId, setPayingInstallmentId] = useState<string | null>(null)

  const fetchCommitments = async () => {
    if (!user) {
      setCommitments([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    const { data, error } = await supabase
      .from('commitments')
      .select('*')
      .order('next_charge_date', { ascending: true })

    if (error) {
      console.error('Error loading commitments:', error)
      setCommitments([])
      setIsLoading(false)
      return
    }

    setCommitments((data ?? []) as Commitment[])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCommitments()
  }, [user])

  const closeCommitmentModal = () => {
    setIsAddCommitmentModalOpen(false)
    setEditingItem(null)
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(t('recurring.confirmDelete'))
    if (!confirmed) return

    try {
      const { error } = await supabase.from('commitments').delete().eq('id', id)
      if (error) throw error
      await fetchCommitments()
    } catch (error) {
      console.error('Failed to delete commitment:', error)
      window.alert(t('recurring.deleteFailed'))
    }
  }

  const handleEdit = (item: Commitment) => {
    setEditingItem({
      id: item.id,
      type: item.type,
      name: item.name,
      amount: Number(item.amount),
      next_charge_date: item.next_charge_date,
      total_installments: item.total_installments,
      current_installment: item.current_installment,
    })
    setIsAddCommitmentModalOpen(true)
  }

  const handlePayInstallment = async (installment: Commitment) => {
    if (!user) return

    const totalInstallments = Math.max(installment.total_installments ?? 0, 0)
    const currentInstallment = Math.max(installment.current_installment ?? 0, 0)
    if (totalInstallments <= 0 || currentInstallment <= 0) {
      window.alert(t('recurring.invalidInstallment'))
      return
    }

    setPayingInstallmentId(installment.id)

    try {
      const { error: transactionError } = await supabase.from('transactions').insert({
        user_id: user.id,
        amount: Number(installment.amount || 0),
        type: 'expense',
        description: t('recurring.installmentPaymentDesc', {
          name: installment.name,
          current: currentInstallment,
          total: totalInstallments,
        }),
        date: new Date().toISOString(),
      })

      if (transactionError) throw transactionError

      if (currentInstallment >= totalInstallments) {
        const { error: deleteError } = await supabase
          .from('commitments')
          .delete()
          .eq('id', installment.id)

        if (deleteError) throw deleteError
      } else {
        const { error: updateError } = await supabase
          .from('commitments')
          .update({ current_installment: currentInstallment + 1 })
          .eq('id', installment.id)

        if (updateError) throw updateError
      }

      await fetchCommitments()
    } catch (error) {
      console.error('Failed to pay installment:', error)
      window.alert(t('recurring.payInstallmentFailed'))
    } finally {
      setPayingInstallmentId(null)
    }
  }

  const subscriptions = useMemo(
    () => commitments.filter((item) => item.type === 'subscription'),
    [commitments],
  )

  const installments = useMemo(
    () => commitments.filter((item) => item.type === 'installment'),
    [commitments],
  )

  const monthlyFixed = useMemo(
    () => subscriptions.reduce((total, item) => total + Number(item.amount || 0), 0),
    [subscriptions],
  )

  const remainingDebt = useMemo(
    () =>
      installments.reduce((total, item) => {
        const totalInstallments = Math.max(item.total_installments ?? 0, 0)
        const currentInstallment = Math.max(item.current_installment ?? 0, 0)
        const pendingInstallments = Math.max(totalInstallments - currentInstallment + 1, 0)
        return total + pendingInstallments * Number(item.amount || 0)
      }, 0),
    [installments],
  )

  return (
    <PageContainer>
      <TopBar>
        <PageTitle>{t('recurring.title')}</PageTitle>
        <AddCommitmentButton
          type="button"
          onClick={() => {
            setEditingItem(null)
            setIsAddCommitmentModalOpen(true)
          }}
        >
          {t('recurring.addCommitment')}
        </AddCommitmentButton>
      </TopBar>

      <SectionCard>
        <SectionHeader>
          <SectionTitle>{t('recurring.activeSubscriptions')}</SectionTitle>
          <SectionKPI>
            {t('recurring.monthlyFixed', { amount: formatMoney(monthlyFixed) })}
          </SectionKPI>
        </SectionHeader>

        <List>
          {isLoading && <ItemMeta>{t('recurring.loadingSubscriptions')}</ItemMeta>}

          {!isLoading && subscriptions.length === 0 && (
            <ItemMeta>{t('recurring.noSubscriptions')}</ItemMeta>
          )}

          {!isLoading &&
            subscriptions.map((subscription) => (
              <ListItem key={subscription.id}>
                <ItemTopRow>
                  <ItemMain>
                    <ItemName>{subscription.name}</ItemName>
                    <ItemMeta>
                      {t('recurring.nextCharge', {
                        date: formatChargeDate(subscription.next_charge_date),
                      })}
                    </ItemMeta>
                  </ItemMain>
                  <RightActions>
                    <ItemAmount>{formatMoney(Number(subscription.amount || 0))}</ItemAmount>
                    <ActionsMenuWrapper>
                      <ActionsTrigger
                        type="button"
                        onClick={() =>
                          setOpenActionMenuId((prev) =>
                            prev === subscription.id ? null : subscription.id,
                          )
                        }
                      >
                        <MoreHorizontal size={16} />
                      </ActionsTrigger>
                      {openActionMenuId === subscription.id && (
                        <ActionsMenu>
                          <MenuItem
                            type="button"
                            onClick={() => {
                              setOpenActionMenuId(null)
                              handleEdit(subscription)
                            }}
                          >
                            <Pencil size={14} />
                            {t('common.edit')}
                          </MenuItem>
                          <MenuItem
                            type="button"
                            onClick={() => {
                              setOpenActionMenuId(null)
                              handleDelete(subscription.id)
                            }}
                          >
                            <Trash2 size={14} />
                            {t('common.delete')}
                          </MenuItem>
                        </ActionsMenu>
                      )}
                    </ActionsMenuWrapper>
                  </RightActions>
                </ItemTopRow>
              </ListItem>
            ))}
        </List>
      </SectionCard>

      <SectionCard>
        <SectionHeader>
          <SectionTitle>{t('recurring.installmentsTitle')}</SectionTitle>
          <SectionKPI>
            {t('recurring.remainingDebt', { amount: formatMoney(remainingDebt) })}
          </SectionKPI>
        </SectionHeader>

        <List>
          {isLoading && <ItemMeta>{t('recurring.loadingInstallments')}</ItemMeta>}

          {!isLoading && installments.length === 0 && (
            <ItemMeta>{t('recurring.noInstallments')}</ItemMeta>
          )}

          {!isLoading &&
            installments.map((installment) => {
              const totalPayments = Math.max(installment.total_installments ?? 0, 0)
              const currentPayment = Math.max(installment.current_installment ?? 0, 0)
              const progress = totalPayments > 0
                ? Math.min((currentPayment / totalPayments) * 100, 100)
                : 0

              return (
                <ListItem key={installment.id}>
                  <InstallmentTop>
                    <ItemMain>
                      <ItemName>{installment.name}</ItemName>
                      <ItemMeta>
                        {t('recurring.paymentProgress', {
                          current: currentPayment,
                          total: totalPayments,
                        })}
                      </ItemMeta>
                    </ItemMain>
                    <RightActions>
                      <ItemAmount>{formatMoney(Number(installment.amount || 0))}</ItemAmount>
                      <PayNextButton
                        type="button"
                        disabled={payingInstallmentId === installment.id}
                        onClick={() => handlePayInstallment(installment)}
                      >
                        <Check size={14} />
                        {payingInstallmentId === installment.id
                          ? t('recurring.paying')
                          : t('recurring.payNext')}
                      </PayNextButton>
                      <ActionsMenuWrapper>
                        <ActionsTrigger
                          type="button"
                          onClick={() =>
                            setOpenActionMenuId((prev) =>
                              prev === installment.id ? null : installment.id,
                            )
                          }
                        >
                          <MoreHorizontal size={16} />
                        </ActionsTrigger>
                        {openActionMenuId === installment.id && (
                          <ActionsMenu>
                            <MenuItem
                              type="button"
                              onClick={() => {
                                setOpenActionMenuId(null)
                                handleEdit(installment)
                              }}
                            >
                              <Pencil size={14} />
                              {t('common.edit')}
                            </MenuItem>
                            <MenuItem
                              type="button"
                              onClick={() => {
                                setOpenActionMenuId(null)
                                handleDelete(installment.id)
                              }}
                            >
                              <Trash2 size={14} />
                              {t('common.delete')}
                            </MenuItem>
                          </ActionsMenu>
                        )}
                      </ActionsMenuWrapper>
                    </RightActions>
                  </InstallmentTop>

                  <ProgressTrack>
                    <ProgressFill style={{ width: `${progress}%` }} />
                  </ProgressTrack>
                </ListItem>
              )
            })}
        </List>
      </SectionCard>

      <AddCommitmentModal
        isOpen={isAddCommitmentModalOpen}
        onClose={closeCommitmentModal}
        onSuccess={fetchCommitments}
        editingItem={editingItem}
      />
    </PageContainer>
  )
}

const PageContainer = styled.div`
  max-width: min(61.25rem, 100%);
  margin: 0 auto;
  padding: 0.75rem 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;

  ${media.md} {
    padding: 1.25rem 1.25rem 1.5rem;
    gap: 1.5rem;
  }
`

const TopBar = styled.header`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;

  ${media.sm} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
`

const PageTitle = styled.h1`
  margin: 0;
  color: #0f172a;
  font-size: clamp(1.35rem, 4vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
`

const AddCommitmentButton = styled.button`
  border: 1px solid #dbe4ef;
  background: #ffffff;
  color: #0f172a;
  padding: 0.65rem 1rem;
  border-radius: 0.8rem;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  transition: all 0.2s ease;
  width: 100%;

  ${media.sm} {
    width: auto;
  }

  &:hover {
    background: #f8fafc;
    transform: translateY(-1px);
  }
`

const SectionCard = styled.section`
  background: #ffffff;
  border: 1px solid #edf2f7;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.04);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;

  ${media.md} {
    border-radius: 1.25rem;
    padding: 1.25rem;
    gap: 1rem;
  }
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const SectionTitle = styled.h2`
  margin: 0;
  color: #0f172a;
  font-size: 1.125rem;
  font-weight: 800;
`

const SectionKPI = styled.span`
  color: #334155;
  font-size: 0.875rem;
  font-weight: 700;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ListItem = styled.article`
  border: 1px solid #f1f5f9;
  border-radius: 0.9rem;
  padding: 0.9rem 1rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const ItemTopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;

  ${media.sm} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }
`

const InstallmentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;

  ${media.sm} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }
`

const RightActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;

  ${media.sm} {
    justify-content: flex-end;
    margin-left: auto;
  }
`

const ItemMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const ItemName = styled.h3`
  margin: 0;
  color: #0f172a;
  font-size: 0.95rem;
  font-weight: 700;
`

const ItemMeta = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 600;
`

const ItemAmount = styled.span`
  color: #0f172a;
  font-size: 0.94rem;
  font-weight: 800;
`

const PayNextButton = styled.button`
  border: 1px solid #bbf7d0;
  background: #f0fdf4;
  color: #166534;
  border-radius: 0.6rem;
  height: 1.9rem;
  padding: 0 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #dcfce7;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const ActionsMenuWrapper = styled.div`
  position: relative;
`

const ActionsTrigger = styled.button`
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #475569;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 0.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
    color: #0f172a;
  }
`

const ActionsMenu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.35rem);
  min-width: 7rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.65rem;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.14);
  z-index: 20;
  padding: 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const MenuItem = styled.button`
  border: none;
  background: transparent;
  color: #334155;
  border-radius: 0.45rem;
  height: 1.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0 0.45rem;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`

const ProgressTrack = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 9999px;
  background: #eef2f7;
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #0f172a 0%, #334155 100%);
  transition: width 0.3s ease;
`
