import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, PiggyBank, X } from 'lucide-react'
import { toast } from 'sonner'
import * as S from '@/components/modals/AddCommitmentModal/AddCommitmentModal.styles'
import * as P from './GoalPiggyModal.styles'
import { CurrencyInput } from '@/components/ui/CurrencyInput/CurrencyInput'
import { useMoneyFormat } from '@/hooks/useMoneyFormat'
import { GoalsService } from '@/services/goals'
import type { Goal } from '@/types/goals'

const QUICK_AMOUNTS = [10, 50, 100] as const

interface GoalPiggyModalProps {
  isOpen: boolean
  goal: Goal | null
  onClose: () => void
  onSuccess: () => Promise<void> | void
}

export function GoalPiggyModal({ isOpen, goal, onClose, onSuccess }: GoalPiggyModalProps) {
  const { t } = useTranslation()
  const formatMoney = useMoneyFormat()
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit')
  const [amount, setAmount] = useState('')
  const [selectedChip, setSelectedChip] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen || !goal) return
    setMode('deposit')
    setAmount('')
    setSelectedChip(null)
    setIsSubmitting(false)
  }, [isOpen, goal?.id])

  const numericAmount = useMemo(() => {
    const n = Number(amount)
    return !amount || Number.isNaN(n) || n <= 0 ? 0 : n
  }, [amount])

  const applyDelta = async (delta: number) => {
    if (!goal || delta === 0) return

    const wasCompleted = goal.is_completed

    try {
      setIsSubmitting(true)
      const updated = await GoalsService.adjustCurrentAmount(goal, delta)
      await onSuccess()

      if (!wasCompleted && updated.is_completed) {
        toast.success(t('garden.piggy.completedToast', { name: goal.name }))
      } else {
        toast.success(delta > 0 ? t('garden.piggy.deposited') : t('garden.piggy.withdrawn'))
      }
      onClose()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t('garden.piggy.updateFailed')
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeposit = () => {
    if (!goal || numericAmount <= 0) {
      toast.error(t('garden.piggy.invalidAmount'))
      return
    }
    void applyDelta(numericAmount)
  }

  const handleWithdraw = () => {
    if (!goal || numericAmount <= 0) {
      toast.error(t('garden.piggy.invalidAmount'))
      return
    }
    if (numericAmount > goal.current_amount) {
      toast.error(t('garden.piggy.withdrawTooMuch'))
      return
    }
    void applyDelta(-numericAmount)
  }

  const handleDelete = async () => {
    if (!goal) return
    const confirmed = window.confirm(t('garden.piggy.deleteConfirm', { name: goal.name }))
    if (!confirmed) return

    try {
      setIsSubmitting(true)
      await GoalsService.deleteGoal(goal.id)
      await onSuccess()
      toast.success(t('garden.piggy.deleted'))
      onClose()
    } catch (e: unknown) {
      console.error(e)
      toast.error(t('garden.piggy.deleteFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const setChip = (value: number) => {
    setSelectedChip(value)
    setAmount(String(value))
  }

  if (!isOpen || !goal) return null

  return (
    <S.Overlay>
      <S.Modal role="dialog" aria-modal="true" aria-labelledby="goal-piggy-title">
        <S.Header>
          <S.Title id="goal-piggy-title">{t('garden.piggy.title')}</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label={t('garden.piggy.close')}>
            <X size={18} />
          </S.CloseButton>
        </S.Header>

        <S.Body>
          <P.SummaryRow>
            <P.SummaryLabel>{goal.name}</P.SummaryLabel>
            <P.SummaryAmount>
              {formatMoney(goal.current_amount)} / {formatMoney(goal.target_amount)}
            </P.SummaryAmount>
          </P.SummaryRow>

          <S.SegmentedControl>
            <S.SegmentButton type="button" $active={mode === 'deposit'} onClick={() => setMode('deposit')}>
              {t('garden.piggy.deposit')}
            </S.SegmentButton>
            <S.SegmentButton type="button" $active={mode === 'withdraw'} onClick={() => setMode('withdraw')}>
              {t('garden.piggy.withdraw')}
            </S.SegmentButton>
          </S.SegmentedControl>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
            <PiggyBank size={22} strokeWidth={2} aria-hidden />
            <P.ChipsLabel>{t('garden.piggy.quickAmounts')}</P.ChipsLabel>
          </div>
          <P.ChipsRow>
            {QUICK_AMOUNTS.map((v) => (
              <P.ChipButton key={v} type="button" $active={selectedChip === v} onClick={() => setChip(v)}>
                {formatMoney(v)}
              </P.ChipButton>
            ))}
          </P.ChipsRow>

          <S.FieldGroup>
            <S.Label htmlFor="piggy-custom-amount">{t('garden.piggy.customAmount')}</S.Label>
            <CurrencyInput
              id="piggy-custom-amount"
              value={amount}
              onChange={(v) => {
                setSelectedChip(null)
                setAmount(v)
              }}
            />
          </S.FieldGroup>

          <P.ActionsRow>
            {mode === 'deposit' ? (
              <P.ActionButton type="button" $variant="in" disabled={isSubmitting} onClick={handleDeposit}>
                {isSubmitting ? (
                  <S.SpinnerIcon>
                    <Loader2 size={18} />
                  </S.SpinnerIcon>
                ) : null}
                {t('garden.piggy.confirmDeposit')}
              </P.ActionButton>
            ) : (
              <P.ActionButton type="button" $variant="out" disabled={isSubmitting} onClick={handleWithdraw}>
                {isSubmitting ? (
                  <S.SpinnerIcon>
                    <Loader2 size={18} />
                  </S.SpinnerIcon>
                ) : null}
                {t('garden.piggy.confirmWithdraw')}
              </P.ActionButton>
            )}
          </P.ActionsRow>

          <P.Divider />

          <P.DangerZone>
            <P.DeleteButton type="button" disabled={isSubmitting} onClick={() => void handleDelete()}>
              {t('garden.piggy.deleteGoal')}
            </P.DeleteButton>
          </P.DangerZone>
        </S.Body>

        <S.Footer>
          <S.CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            {t('garden.piggy.closeFooter')}
          </S.CancelButton>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  )
}
