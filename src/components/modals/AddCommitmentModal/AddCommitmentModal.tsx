import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { CurrencyInput } from '@/components/ui/CurrencyInput/CurrencyInput';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import * as S from './AddCommitmentModal.styles';

type CommitmentType = 'subscription' | 'installment';

export type EditableCommitment = {
  id: string;
  type: CommitmentType;
  name: string;
  amount: number;
  next_charge_date: string;
  total_installments: number | null;
  current_installment: number | null;
};

interface AddCommitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
  editingItem?: EditableCommitment | null;
}

export function AddCommitmentModal({ isOpen, onClose, onSuccess, editingItem }: AddCommitmentModalProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [type, setType] = useState<CommitmentType>('subscription');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [nextChargeDate, setNextChargeDate] = useState('');
  const [totalInstallments, setTotalInstallments] = useState('');
  const [currentInstallment, setCurrentInstallment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (editingItem) {
      setType(editingItem.type);
      setName(editingItem.name);
      setAmount(String(editingItem.amount));
      setNextChargeDate(editingItem.next_charge_date);
      setTotalInstallments(editingItem.total_installments ? String(editingItem.total_installments) : '');
      setCurrentInstallment(editingItem.current_installment ? String(editingItem.current_installment) : '');
    } else {
      setType('subscription');
      setName('');
      setAmount('');
      setNextChargeDate('');
      setTotalInstallments('');
      setCurrentInstallment('');
    }

    setIsSubmitting(false);
  }, [isOpen, editingItem]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error(t('addCommitmentModal.mustLogin'));
      return;
    }

    if (!name.trim() || !amount || !nextChargeDate) {
      toast.error(t('addCommitmentModal.fillRequired'));
      return;
    }

    const numericAmount = Number(amount);
    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      toast.error(t('addCommitmentModal.invalidAmount'));
      return;
    }

    let parsedTotalInstallments: number | null = null;
    let parsedCurrentInstallment: number | null = null;

    if (type === 'installment') {
      if (!totalInstallments || !currentInstallment) {
        toast.error(t('addCommitmentModal.installmentFields'));
        return;
      }

      parsedTotalInstallments = Number(totalInstallments);
      parsedCurrentInstallment = Number(currentInstallment);

      if (
        Number.isNaN(parsedTotalInstallments) ||
        Number.isNaN(parsedCurrentInstallment) ||
        parsedTotalInstallments <= 0 ||
        parsedCurrentInstallment <= 0
      ) {
        toast.error(t('addCommitmentModal.installmentValues'));
        return;
      }

      if (parsedCurrentInstallment > parsedTotalInstallments) {
        toast.error(t('addCommitmentModal.currentGtTotal'));
        return;
      }
    }

    try {
      setIsSubmitting(true);

      const payload = {
        user_id: user.id,
        type,
        name: name.trim(),
        amount: numericAmount,
        next_charge_date: nextChargeDate,
        total_installments: type === 'installment' ? parsedTotalInstallments : null,
        current_installment: type === 'installment' ? parsedCurrentInstallment : null,
      };

      const { error } = editingItem
        ? await supabase.from('commitments').update(payload).eq('id', editingItem.id)
        : await supabase.from('commitments').insert(payload);

      if (error) {
        throw error;
      }

      await onSuccess();
      toast.success(editingItem ? t('addCommitmentModal.updated') : t('addCommitmentModal.saved'));
      onClose();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t('addCommitmentModal.saveFailed');
      toast.error(message || t('addCommitmentModal.saveFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <S.Overlay>
      <S.Modal role="dialog" aria-modal="true" aria-labelledby="new-commitment-title">
        <S.Header>
          <S.Title id="new-commitment-title">
            {editingItem ? t('addCommitmentModal.editTitle') : t('addCommitmentModal.newTitle')}
          </S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label={t('addCommitmentModal.close')}>
            <X size={18} />
          </S.CloseButton>
        </S.Header>

        <S.Body>
          <S.SegmentedControl>
            <S.SegmentButton
              type="button"
              $active={type === 'subscription'}
              onClick={() => setType('subscription')}
            >
              {t('addCommitmentModal.subscription')}
            </S.SegmentButton>
            <S.SegmentButton
              type="button"
              $active={type === 'installment'}
              onClick={() => setType('installment')}
            >
              {t('addCommitmentModal.installment')}
            </S.SegmentButton>
          </S.SegmentedControl>

          <S.FieldGroup>
            <S.Label htmlFor="commitment-name">{t('addCommitmentModal.name')}</S.Label>
            <S.Input
              id="commitment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('addCommitmentModal.namePlaceholder')}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.Label htmlFor="commitment-amount">{t('addCommitmentModal.monthlyAmount')}</S.Label>
            <CurrencyInput
              id="commitment-amount"
              value={amount}
              onChange={setAmount}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.Label htmlFor="commitment-next-charge">{t('addCommitmentModal.nextChargeDate')}</S.Label>
            <S.Input
              id="commitment-next-charge"
              type="date"
              value={nextChargeDate}
              onChange={(e) => setNextChargeDate(e.target.value)}
            />
          </S.FieldGroup>

          {type === 'installment' && (
            <S.TwoColumns>
              <S.FieldGroup>
                <S.Label htmlFor="commitment-total-installments">{t('addCommitmentModal.totalInstallments')}</S.Label>
                <S.Input
                  id="commitment-total-installments"
                  type="number"
                  min={1}
                  value={totalInstallments}
                  onChange={(e) => setTotalInstallments(e.target.value)}
                  placeholder="12"
                />
              </S.FieldGroup>

              <S.FieldGroup>
                <S.Label htmlFor="commitment-current-payment">{t('addCommitmentModal.currentPayment')}</S.Label>
                <S.Input
                  id="commitment-current-payment"
                  type="number"
                  min={1}
                  value={currentInstallment}
                  onChange={(e) => setCurrentInstallment(e.target.value)}
                  placeholder="1"
                />
              </S.FieldGroup>
            </S.TwoColumns>
          )}
        </S.Body>

        <S.Footer>
          <S.CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
            {t('addCommitmentModal.cancel')}
          </S.CancelButton>
          <S.SaveButton type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && (
              <S.SpinnerIcon>
                <Loader2 size={16} />
              </S.SpinnerIcon>
            )}
            {isSubmitting ? t('addCommitmentModal.saving') : t('addCommitmentModal.saveCommitment')}
          </S.SaveButton>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
}
