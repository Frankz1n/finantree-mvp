import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Loader2, X } from 'lucide-react'
import { toast } from 'sonner'
import * as S from '@/components/modals/AddCommitmentModal/AddCommitmentModal.styles'
import * as Extra from './AddGoalModal.styles'
import { CurrencyInput } from '@/components/ui/CurrencyInput/CurrencyInput'
import { useAuth } from '@/hooks/useAuth'
import { GoalsService } from '@/services/goals'

interface AddGoalModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => Promise<void> | void
}

export function AddGoalModal({ isOpen, onClose, onSuccess }: AddGoalModalProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [deadline, setDeadline] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setName('')
    setTargetAmount('')
    setDeadline('')
    setIsSubmitting(false)
  }, [isOpen])

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t('garden.addModal.mustLogin'))
      return
    }

    if (!name.trim()) {
      toast.error(t('garden.addModal.nameRequired'))
      return
    }

    const target = Number(targetAmount)
    if (!targetAmount || Number.isNaN(target) || target <= 0) {
      toast.error(t('garden.addModal.invalidTarget'))
      return
    }

    try {
      setIsSubmitting(true)
      await GoalsService.createGoal({
        user_id: user.id,
        name: name.trim(),
        target_amount: target,
        deadline: deadline.trim() ? deadline : null,
      })
      await onSuccess()
      toast.success(t('garden.addModal.saved'))
      onClose()
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t('garden.addModal.saveFailed')
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <S.Overlay>
      <S.Modal role="dialog" aria-modal="true" aria-labelledby="add-goal-title">
        <S.Header>
          <S.Title id="add-goal-title">{t('garden.addModal.title')}</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label={t('garden.addModal.close')}>
            <X size={18} />
          </S.CloseButton>
        </S.Header>

        <S.Body>
          <S.FieldGroup>
            <S.Label htmlFor="goal-name">{t('garden.addModal.name')}</S.Label>
            <S.Input
              id="goal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('garden.addModal.namePlaceholder')}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.Label htmlFor="goal-target">{t('garden.addModal.target')}</S.Label>
            <CurrencyInput id="goal-target" value={targetAmount} onChange={setTargetAmount} />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.Label htmlFor="goal-deadline">{t('garden.addModal.deadline')}</S.Label>
            <S.Input id="goal-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            <Extra.Hint>{t('garden.addModal.deadlineHint')}</Extra.Hint>
          </S.FieldGroup>
        </S.Body>

        <S.Footer>
          <S.CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            {t('garden.addModal.cancel')}
          </S.CancelButton>
          <S.SaveButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && (
              <S.SpinnerIcon>
                <Loader2 size={16} />
              </S.SpinnerIcon>
            )}
            {isSubmitting ? t('garden.addModal.saving') : t('garden.addModal.save')}
          </S.SaveButton>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  )
}
