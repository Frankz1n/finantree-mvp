import { X, ArrowUp, ArrowDown, Calendar, Clock, Check, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { TransactionService } from "@/services/transactions"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { CurrencyInput } from "@/components/ui/CurrencyInput/CurrencyInput"
import * as S from "./AddTransactionModal.styles"

interface AddTransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (data: any) => void
}

interface Category {
    id: string
    name: string
    icon: string
    type: 'income' | 'expense'
}

export function AddTransactionModal({ isOpen, onClose, onSave }: AddTransactionModalProps) {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [type, setType] = useState<'income' | 'expense'>('expense')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        const loadCategories = async () => {
            if (!user) return
            setIsLoading(true)
            const data = await TransactionService.getCategories(type, user.id)
            setCategories(data as Category[])
            setIsLoading(false)
            setSelectedCategory(null) // Reset selection on type change
        }
        if (isOpen) {
            loadCategories()
        }
    }, [type, isOpen, user])

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setAmount('')
            setDescription('')
            setSelectedCategory(null)
            setIsSubmitting(false)
        }
    }, [isOpen])

    const handleSave = async () => {
        if (!user) return

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error(t("addTransaction.validAmount"))
            return
        }
        if (!description.trim()) {
            toast.error(t("addTransaction.enterDescription"))
            return
        }
        if (!selectedCategory) {
            toast.error(t("addTransaction.selectCategory"))
            return
        }

        try {
            setIsSubmitting(true)
            await TransactionService.createTransaction({
                user_id: user.id,
                amount: Number(amount),
                type: type,
                description: description,
                category_id: selectedCategory,
                due_date: new Date().toISOString(), // Using today for now
                payment_date: new Date().toISOString(),
                status: 'paid'
            })
            toast.success(t("addTransaction.success"))
            window.dispatchEvent(new CustomEvent('transaction_updated'))
            onSave({})
            onClose()
        } catch {
            toast.error(t("addTransaction.saveError"))
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <S.Overlay>
            <S.ModalContainer>
                <S.Header>
                    <S.Title>{t("addTransaction.title")}</S.Title>
                    <S.CloseButton onClick={onClose}>
                        <X size={20} />
                    </S.CloseButton>
                </S.Header>

                <S.Body>
                    <S.TypeSelectorWrapper>
                        <S.TypeButton
                            $active={type === 'expense'}
                            $type="expense"
                            onClick={() => setType('expense')}
                        >
                            <ArrowDown size={18} />
                            {t("addTransaction.expense")}
                        </S.TypeButton>
                        <S.TypeButton
                            $active={type === 'income'}
                            $type="income"
                            onClick={() => setType('income')}
                        >
                            <ArrowUp size={18} />
                            {t("addTransaction.income")}
                        </S.TypeButton>
                    </S.TypeSelectorWrapper>

                    <S.LabelGroup>
                        <S.Label>{t("addTransaction.amount")}</S.Label>
                        <S.CurrencyInputWrapper>
                            <CurrencyInput
                                value={amount}
                                onChange={setAmount}
                                autoFocus
                            />
                        </S.CurrencyInputWrapper>
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>{t("addTransaction.description")}</S.Label>
                        <S.DescriptionInput
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={t("addTransaction.descriptionPh")}
                        />
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>{t("addTransaction.category")}</S.Label>
                        {isLoading ? (
                            <S.CenteredContainer>
                                <S.MutedSpinnerIcon><Loader2 /></S.MutedSpinnerIcon>
                            </S.CenteredContainer>
                        ) : (
                            <S.CategoryListWrapper>
                                <S.CategoryGrid>
                                    {categories.map((cat) => (
                                        <S.CategoryButton
                                            key={cat.id}
                                            $selected={selectedCategory === cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                        >
                                            <S.CategoryIcon>{cat.icon}</S.CategoryIcon>
                                            <S.CategoryName>{cat.name}</S.CategoryName>
                                        </S.CategoryButton>
                                    ))}
                                    {categories.length === 0 && (
                                        <S.EmptyCategoryMessage>
                                            {t("addTransaction.noCategories")}
                                        </S.EmptyCategoryMessage>
                                    )}
                                </S.CategoryGrid>
                            </S.CategoryListWrapper>
                        )}
                    </S.LabelGroup>

                    <S.TwoColsGrid>
                        <S.LabelGroup>
                            <S.Label>{t("addTransaction.date")}</S.Label>
                            <S.InfoBox>
                                <S.MutedIcon><Calendar size={18} /></S.MutedIcon>
                                <S.InfoBoxText>{t("addTransaction.today")}</S.InfoBoxText>
                            </S.InfoBox>
                        </S.LabelGroup>
                        <S.LabelGroup>
                            <S.Label>{t("addTransaction.time")}</S.Label>
                            <S.InfoBox>
                                <S.MutedIcon><Clock size={18} /></S.MutedIcon>
                                <S.InfoBoxText>{t("addTransaction.now")}</S.InfoBoxText>
                            </S.InfoBox>
                        </S.LabelGroup>
                    </S.TwoColsGrid>

                    <S.SaveButton
                        onClick={handleSave}
                        disabled={isSubmitting}
                        $type={type}
                    >
                        {isSubmitting ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : <Check size={20} strokeWidth={3} />}
                        {isSubmitting
                            ? t("addTransaction.saving")
                            : type === 'expense'
                                ? t("addTransaction.addExpense")
                                : t("addTransaction.addIncome")}
                    </S.SaveButton>
                </S.Body>
            </S.ModalContainer>
        </S.Overlay>
    )
}
