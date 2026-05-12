import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sprout } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useMoneyFormat } from '@/hooks/useMoneyFormat'
import { appLanguageToBcp47 } from '@/lib/i18nLocale'
import { GoalsService } from '@/services/goals'
import type { Goal } from '@/types/goals'
import { AddGoalModal } from '@/components/modals/AddGoalModal/AddGoalModal'
import { GoalPiggyModal } from '@/components/modals/GoalPiggyModal/GoalPiggyModal'
import * as S from './Garden.styles'

function progressPercent(current: number, target: number): number {
  if (target <= 0) return 0
  return Math.min(100, Math.round((current / target) * 100))
}

function progressLabel(current: number, target: number): number {
  if (target <= 0) return 0
  return Math.round((current / target) * 100)
}

export function Garden() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const formatMoney = useMoneyFormat()
  const intlLocale = useMemo(() => appLanguageToBcp47(i18n.language), [i18n.language])

  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [piggyGoal, setPiggyGoal] = useState<Goal | null>(null)

  const loadGoals = useCallback(async () => {
    if (!user) {
      setGoals([])
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const data = await GoalsService.listGoalsForUser(user.id)
      setGoals(data)
    } catch (e) {
      console.error('Garden loadGoals:', e)
      setGoals([])
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    void loadGoals()
  }, [loadGoals])

  const formatDeadline = (date: string | null) => {
    if (!date) return null
    return new Intl.DateTimeFormat(intlLocale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`))
  }

  const openPiggy = (goal: Goal) => {
    setPiggyGoal(goal)
  }

  const closePiggy = () => setPiggyGoal(null)

  const handlePiggySuccess = async () => {
    await loadGoals()
  }

  return (
    <S.PageContainer>
      <S.TopBar>
        <S.TitleBlock>
          <S.PageTitle>{t('garden.title')}</S.PageTitle>
          <S.PageSubtitle>{t('garden.subtitle')}</S.PageSubtitle>
        </S.TitleBlock>
        <S.AddGoalButton type="button" onClick={() => setAddModalOpen(true)}>
          {t('garden.addGoal')}
        </S.AddGoalButton>
      </S.TopBar>

      <S.CardsGrid>
        {isLoading && <S.LoadingText>{t('garden.loading')}</S.LoadingText>}

        {!isLoading && goals.length === 0 && (
          <S.EmptyCard>
            <S.EmptyEmoji aria-hidden>🌱</S.EmptyEmoji>
            <S.EmptyTitle>{t('garden.emptyTitle')}</S.EmptyTitle>
            <S.EmptyHint>{t('garden.emptyHint')}</S.EmptyHint>
            <S.EmptyCta type="button" onClick={() => setAddModalOpen(true)}>
              {t('garden.createFirst')}
            </S.EmptyCta>
          </S.EmptyCard>
        )}

        {!isLoading &&
          goals.map((goal) => {
            const pctBar = progressPercent(goal.current_amount, goal.target_amount)
            const pctLabel = progressLabel(goal.current_amount, goal.target_amount)
            const deadlineLabel = formatDeadline(goal.deadline)

            return (
              <S.GoalCard
                key={goal.id}
                type="button"
                $completed={goal.is_completed}
                onClick={() => openPiggy(goal)}
              >
                <S.CardTop>
                  <S.CardName>{goal.name}</S.CardName>
                  {goal.is_completed ? <S.CompletedBadge>{t('garden.completed')}</S.CompletedBadge> : null}
                </S.CardTop>

                <S.ProgressTrack>
                  <S.ProgressFill style={{ width: `${pctBar}%` }} />
                </S.ProgressTrack>

                <S.CardMeta>
                  <S.AmountRow>
                    {formatMoney(goal.current_amount)} / {formatMoney(goal.target_amount)}
                  </S.AmountRow>
                  <S.PercentRow>{t('garden.progressPercent', { percent: pctLabel })}</S.PercentRow>
                  {deadlineLabel ? <S.DeadlineRow>{t('garden.deadline', { date: deadlineLabel })}</S.DeadlineRow> : null}
                  <S.TapHint>
                    <Sprout size={14} aria-hidden />
                    {t('garden.tapToSave')}
                  </S.TapHint>
                </S.CardMeta>
              </S.GoalCard>
            )
          })}
      </S.CardsGrid>

      <AddGoalModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSuccess={loadGoals} />

      <GoalPiggyModal
        isOpen={piggyGoal !== null}
        goal={piggyGoal}
        onClose={closePiggy}
        onSuccess={handlePiggySuccess}
      />
    </S.PageContainer>
  )
}
