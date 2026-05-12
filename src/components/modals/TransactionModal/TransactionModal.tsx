import { X, Check, Loader2, Calendar } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { TransactionService } from "@/services/transactions"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CurrencyInput } from "@/components/ui/CurrencyInput/CurrencyInput"
import * as S from "./TransactionModal.styles"

interface TransactionModalProps {
    isOpen: boolean
    type: 'income' | 'expense'
    onClose: () => void
    onSuccess: () => void
    initialData?: any
}

interface Category {
    id: string
    name: string
    icon: string
    type: 'income' | 'expense'
}

export function TransactionModal({ isOpen, type, onClose, onSuccess, initialData }: TransactionModalProps) {
    const { t, i18n } = useTranslation()
    const { user } = useAuth()
    const dateFormat = useMemo(() => (i18n.language === 'en' ? 'MM/dd/yyyy' : 'dd/MM/yyyy'), [i18n.language])
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    const [isAddingCategory, setIsAddingCategory] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [date, setDate] = useState<Date>(new Date())
    const [isLoadingCats, setIsLoadingCats] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const isIncome = type === 'income'

    useEffect(() => {
        if (!isOpen || !user) return
        const load = async () => {
            setIsLoadingCats(true)
            const data = await TransactionService.getCategories(type, user.id)
            setCategories(data as Category[])
            setIsLoadingCats(false)
        }
        load()
    }, [type, isOpen, user])


    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setAmount(initialData.amount.toString())
                setDescription(initialData.description)
                setSelectedCategory(initialData.category_id || initialData.category)
                setDate(new Date(initialData.date))
                setIsPending(initialData.status === 'pending')
            } else {
                setAmount('')
                setDescription('')
                setSelectedCategory(null)
                setDate(new Date())
                setIsPending(false)
            }
            setIsSubmitting(false)
            setIsAddingCategory(false)
            setNewCategoryName('')
        }
    }, [isOpen, initialData])

    const handleAddCategory = async () => {
        if (!user || !newCategoryName.trim()) return;
        try {
            setIsLoadingCats(true)
            const newCat = await TransactionService.createCategory(user.id, newCategoryName.trim(), type)
            setCategories([...categories, newCat])
            setSelectedCategory(newCat.id)
            setIsAddingCategory(false)
            setNewCategoryName('')
        } catch {
            toast.error(t("transactionModal.categoryCreateFailed"))
        } finally {
            setIsLoadingCats(false)
        }
    }

    const handleSubmit = async () => {
        const currentUserId = user?.id || "00000000-0000-0000-0000-000000000000";

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error(t("transactionModal.validAmount"))
            return
        }
        if (!description.trim()) {
            toast.error(t("transactionModal.enterDescription"))
            return
        }
        if (!selectedCategory) {
            toast.error(t("transactionModal.selectCategory"))
            return
        }

        try {
            setIsSubmitting(true)
            const dueDate = date.toISOString()

            if (initialData?.id) {
                await TransactionService.updateTransaction(initialData.id, {
                    amount: Number(amount),
                    description: description.trim(),
                    category_id: selectedCategory,
                    date: dueDate,
                    status: isPending ? 'pending' : 'paid'
                })
                toast.success(isIncome ? t("transactionModal.incomeUpdated") : t("transactionModal.expenseUpdated"))
            } else {
                await TransactionService.createTransaction({
                    user_id: currentUserId,
                    amount: Number(amount),
                    type,
                    description: description.trim(),
                    category_id: selectedCategory,
                    date: dueDate,
                    status: isPending ? 'pending' : 'paid'
                })
                toast.success(isIncome ? t("transactionModal.incomeAdded") : t("transactionModal.expenseAdded"))
            }

            window.dispatchEvent(new CustomEvent('transaction_updated'))
            onSuccess()
            onClose()
        } catch {
            toast.error(t("transactionModal.saveError"))
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <S.Overlay>
            <S.ModalContainer>
                <S.TopBar $isIncome={isIncome} />

                <S.Header>
                    <S.Title $isIncome={isIncome}>
                        {initialData
                            ? isIncome
                                ? t("transactionModal.editIncome")
                                : t("transactionModal.editExpense")
                            : isIncome
                                ? t("transactionModal.newIncome")
                                : t("transactionModal.newExpense")}
                    </S.Title>
                    <S.CloseButton onClick={onClose}>
                        <X size={20} />
                    </S.CloseButton>
                </S.Header>

                <S.Body>
                    <S.LabelGroup>
                        <S.Label>{t("transactionModal.amount")}</S.Label>
                        <S.CurrencyInputWrapper>
                            <CurrencyInput
                                value={amount}
                                onChange={setAmount}
                                autoFocus
                            />
                        </S.CurrencyInputWrapper>
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>{t("transactionModal.description")}</S.Label>
                        <S.TextInput
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={isIncome ? t("transactionModal.descriptionIncomePh") : t("transactionModal.descriptionExpensePh")}
                        />
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>{t("transactionModal.category")}</S.Label>
                        {isLoadingCats ? (
                            <S.LoaderContainer>
                                <S.MutedSpinnerIcon><Loader2 /></S.MutedSpinnerIcon>
                            </S.LoaderContainer>
                        ) : (
                            <S.CategoriesContainer>
                                <S.CategoriesGrid>
                                    {categories.map((cat) => (
                                        <S.CategoryButton
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            $isSelected={selectedCategory === cat.id}
                                            $isIncome={isIncome}
                                        >
                                            <S.CategoryIcon>{cat.icon}</S.CategoryIcon>
                                            <S.CategoryName>{cat.name}</S.CategoryName>
                                        </S.CategoryButton>
                                    ))}

                                    {isAddingCategory ? (
                                        <S.NewCategoryForm onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleAddCategory(); }}>
                                            <S.NewCategoryInput
                                                autoFocus
                                                value={newCategoryName}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryName(e.target.value)}
                                                placeholder={t("transactionModal.categoryNamePh")}
                                                onBlur={() => setTimeout(() => setIsAddingCategory(false), 200)}
                                            />
                                        </S.NewCategoryForm>
                                    ) : (
                                        <S.CategoryButton type="button" onClick={(e: React.MouseEvent) => { e.preventDefault(); setIsAddingCategory(true) }} $isIncome={isIncome}>
                                            <S.CategoryIcon>+</S.CategoryIcon>
                                            <S.CategoryName>{t("transactionModal.newCategory")}</S.CategoryName>
                                        </S.CategoryButton>
                                    )}

                                    {categories.length === 0 && !isAddingCategory && (
                                        <S.EmptyCategories>
                                            {t("transactionModal.noCategories")}
                                        </S.EmptyCategories>
                                    )}
                                </S.CategoriesGrid>
                            </S.CategoriesContainer>
                        )}
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>{t("transactionModal.date")}</S.Label>
                        <S.DateInputContainer>
                            <S.DateIcon><Calendar size={18} /></S.DateIcon>
                            <S.DatePickerWrapper>
                                <DatePicker
                                    selected={date}
                                    onChange={(newDate: Date | null) => setDate(newDate || new Date())}
                                    dateFormat={dateFormat}
                                    className="custom-datepicker"
                                />
                            </S.DatePickerWrapper>
                        </S.DateInputContainer>
                    </S.LabelGroup>

                    <S.CheckboxContainer $isIncome={isIncome}>
                        <S.CheckboxInput 
                            checked={isPending} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsPending(e.target.checked)} 
                        />
                        <S.CheckboxLabelText>
                            {isIncome ? t("transactionModal.pendingIncome") : t("transactionModal.pendingBill")}
                        </S.CheckboxLabelText>
                    </S.CheckboxContainer>

                    <S.SaveButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        $isIncome={isIncome}
                    >
                        {isSubmitting ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : <Check size={20} strokeWidth={3} />}
                        {isSubmitting
                            ? t("transactionModal.saving")
                            : initialData
                                ? t("transactionModal.saveChanges")
                                : isIncome
                                    ? t("transactionModal.addIncome")
                                    : t("transactionModal.addExpense")}
                    </S.SaveButton>
                </S.Body>
            </S.ModalContainer>
        </S.Overlay>
    )
}
