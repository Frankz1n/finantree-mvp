import { X, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { CurrencyInput } from "@/components/ui/CurrencyInput"
import { SavingBoxService } from "@/services/savingBoxes"
import * as S from "./GoalTransactionModal.styles"

interface GoalTransactionModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    boxId: string
    type: 'deposit' | 'withdrawal'
    currentAmount: number
    initialAmount?: number
}

export function GoalTransactionModal({ isOpen, onClose, onSuccess, boxId, type, currentAmount, initialAmount }: GoalTransactionModalProps) {
    const { user } = useAuth()
    const [amount, setAmount] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setAmount(initialAmount ? initialAmount.toString() : '')
            setIsSubmitting(false)
        }
    }, [isOpen, initialAmount])

    const isDeposit = type === 'deposit'

    const handleSubmit = async () => {
        if (!user) return

        const amountValue = Number(amount)

        if (!amount || isNaN(amountValue) || amountValue <= 0) {
            toast.error("Por favor, insira um valor válido.")
            return
        }

        if (!isDeposit && amountValue > currentAmount) {
            toast.error("O valor de resgate não pode ser maior que o saldo atual.")
            return
        }

        try {
            setIsSubmitting(true)

            if (isDeposit) {
                await SavingBoxService.deposit(boxId, user.id, amountValue)
                toast.success("Depósito realizado com sucesso! 🎉")
            } else {
                await SavingBoxService.withdraw(boxId, user.id, amountValue)
                toast.success("Resgate realizado com sucesso! 💸")
            }

            onSuccess()
            onClose()
        } catch (error: any) {
            console.error("Transaction Error:", error)
            toast.error(error.message || "Ocorreu um erro ao processar a transação.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <S.Overlay>
            <S.Backdrop onClick={onClose} />

            <S.ModalContainer>
                <S.CloseButton onClick={onClose}>
                    <X size={20} />
                </S.CloseButton>

                <S.Header>
                    <S.HeaderFlexData>
                        <S.IconContainer $isDeposit={isDeposit}>
                            <S.IconEmoji>{isDeposit ? '💰' : '💸'}</S.IconEmoji>
                        </S.IconContainer>
                        <S.TitleContainer>
                            <S.Title>{isDeposit ? 'Guardar Dinheiro' : 'Resgatar Valor'}</S.Title>
                            <S.SubTitle>{isDeposit ? 'Aproxime-se do seu objetivo!' : 'Retirar fundos da sua meta.'}</S.SubTitle>
                        </S.TitleContainer>
                    </S.HeaderFlexData>
                </S.Header>

                <S.FormContainer>
                    <S.LabelGroup>
                        <S.Label>Valor</S.Label>
                        <CurrencyInput
                            value={amount}
                            onChange={(val) => setAmount(val)}
                            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-4 md:py-5 text-base md:text-lg focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-4 focus:ring-slate-900/10 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        />
                    </S.LabelGroup>

                    <S.ActionButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        $isDeposit={isDeposit}
                    >
                        {isSubmitting ? (
                            <S.ButtonContent>
                                <Loader2 size={24} className="animate-spin" />
                                <span>Processando...</span>
                            </S.ButtonContent>
                        ) : (
                            isDeposit ? 'Confirmar Depósito' : 'Confirmar Resgate'
                        )}
                    </S.ActionButton>
                </S.FormContainer>
            </S.ModalContainer>
        </S.Overlay>
    )
}
