import { X, Check, Loader2, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
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
    const { user } = useAuth()
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
        } catch (e: any) {
            toast.error("Failed to create category")
        } finally {
            setIsLoadingCats(false)
        }
    }

    const handleSubmit = async () => {
        const currentUserId = user?.id || "00000000-0000-0000-0000-000000000000";

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount.")
            return
        }
        if (!description.trim()) {
            toast.error("Please enter a description.")
            return
        }
        if (!selectedCategory) {
            toast.error("Please select a category.")
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
                toast.success(isIncome ? "Income updated successfully!" : "Expense updated successfully!")
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
                toast.success(isIncome ? "Income added successfully!" : "Expense added successfully!")
            }

            window.dispatchEvent(new CustomEvent('transaction_updated'))
            onSuccess()
            onClose()
        } catch {
            toast.error("Error saving transaction. Please try again.")
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
                        {initialData ? (isIncome ? "Edit Income" : "Edit Expense") : (isIncome ? "New Income" : "New Expense")}
                    </S.Title>
                    <S.CloseButton onClick={onClose}>
                        <X size={20} />
                    </S.CloseButton>
                </S.Header>

                <S.Body>
                    <S.LabelGroup>
                        <S.Label>Amount</S.Label>
                        <S.CurrencyInputWrapper>
                            <CurrencyInput
                                value={amount}
                                onChange={setAmount}
                                autoFocus
                            />
                        </S.CurrencyInputWrapper>
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>Description</S.Label>
                        <S.TextInput
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder={isIncome ? "e.g. Salary, Freelance" : "e.g. Uber, Groceries"}
                        />
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>Category</S.Label>
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
                                                placeholder="Name..."
                                                onBlur={() => setTimeout(() => setIsAddingCategory(false), 200)}
                                            />
                                        </S.NewCategoryForm>
                                    ) : (
                                        <S.CategoryButton type="button" onClick={(e: React.MouseEvent) => { e.preventDefault(); setIsAddingCategory(true) }} $isIncome={isIncome}>
                                            <S.CategoryIcon>+</S.CategoryIcon>
                                            <S.CategoryName>New</S.CategoryName>
                                        </S.CategoryButton>
                                    )}

                                    {categories.length === 0 && !isAddingCategory && (
                                        <S.EmptyCategories>
                                            No categories found.
                                        </S.EmptyCategories>
                                    )}
                                </S.CategoriesGrid>
                            </S.CategoriesContainer>
                        )}
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>Date</S.Label>
                        <S.DateInputContainer>
                            <S.DateIcon><Calendar size={18} /></S.DateIcon>
                            <S.DatePickerWrapper>
                                <DatePicker
                                    selected={date}
                                    onChange={(newDate: Date | null) => setDate(newDate || new Date())}
                                    dateFormat="MM/dd/yyyy"
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
                            {isIncome ? "Upcoming Income (Pending)" : "Upcoming Bill (Pending)"}
                        </S.CheckboxLabelText>
                    </S.CheckboxContainer>

                    <S.SaveButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        $isIncome={isIncome}
                    >
                        {isSubmitting ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : <Check size={20} strokeWidth={3} />}
                        {isSubmitting ? "Saving..." : initialData ? "Save Changes" : `Add ${isIncome ? 'Income' : 'Expense'}`}
                    </S.SaveButton>
                </S.Body>
            </S.ModalContainer>
        </S.Overlay>
    )
}
