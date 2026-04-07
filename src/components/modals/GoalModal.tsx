import { X, Check, Loader2, Target } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { CurrencyInput } from "@/components/ui/CurrencyInput"
import { SavingBoxService } from "@/services/savingBoxes"
import * as S from "./GoalModal.styles"

interface GoalModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function GoalModal({ isOpen, onClose, onSuccess }: GoalModalProps) {
    const { user } = useAuth()
    const [name, setName] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setName('')
            setTargetAmount('')
            setIsSubmitting(false)
        }
    }, [isOpen])

    const handleSubmit = async () => {
        if (!user) return

        if (!name.trim()) {
            toast.error("Por favor, insira o nome da meta.")
            return
        }
        if (!targetAmount || isNaN(Number(targetAmount)) || Number(targetAmount) <= 0) {
            toast.error("Por favor, insira um valor alvo válido.")
            return
        }

        try {
            setIsSubmitting(true)

            await SavingBoxService.create({
                user_id: user.id,
                name: name.trim(),
                target_amount: Number(targetAmount),
            })

            toast.success("Meta criada com sucesso! 🌱")
            onSuccess()
            onClose()
        } catch {
            toast.error("Erro ao criar meta. Tente novamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <S.Overlay>
            <S.ModalContainer>
                <S.TopBar />

                <S.Header>
                    <S.HeaderTitleSection>
                        <S.IconContainer>
                            <Target size={20} />
                        </S.IconContainer>
                        <S.Title>Nova Meta</S.Title>
                    </S.HeaderTitleSection>
                    <S.CloseButton onClick={onClose}>
                        <X size={20} />
                    </S.CloseButton>
                </S.Header>

                <S.Body>
                    <S.LabelGroup>
                        <S.Label>Nome da Meta</S.Label>
                        <S.TextInput
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Viagem a Málaga, Reserva de Emergência"
                            autoFocus
                        />
                    </S.LabelGroup>

                    <S.LabelGroup>
                        <S.Label>Valor Alvo</S.Label>
                        <S.CurrencyInputWrapper>
                            <CurrencyInput
                                value={targetAmount}
                                onChange={setTargetAmount}
                                className="border-none bg-transparent text-3xl font-bold text-slate-900 shadow-none outline-none focus-visible:ring-0 placeholder:text-slate-200 px-0"
                            />
                        </S.CurrencyInputWrapper>
                    </S.LabelGroup>

                    <S.InfoBox>
                        <S.InfoText>
                            💡 Sua meta aparecerá no Jardim. O valor guardado começa em R$ 0,00 e poderá ser atualizado a qualquer momento.
                        </S.InfoText>
                    </S.InfoBox>

                    <S.SaveButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <Check size={20} strokeWidth={3} />}
                        {isSubmitting ? "Criando..." : "Criar Meta"}
                    </S.SaveButton>
                </S.Body>
            </S.ModalContainer>
        </S.Overlay>
    )
}
