import { useState } from "react"
import { ShieldCheck, X } from "lucide-react"
import { SharingService } from "@/services/sharing"
import { toast } from "sonner"
import * as S from "./ConsentModal.styles"

interface ConsentModalProps {
    isOpen: boolean
    onClose: () => void
    inviteId: string
    inviterName: string
    onAction: () => void
}

export function ConsentModal({ isOpen, onClose, inviteId, inviterName, onAction }: ConsentModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const handleAction = async (status: 'accepted' | 'rejected') => {
        try {
            setIsLoading(true)
            await SharingService.respondToInvite(inviteId, status)
            toast.success(status === 'accepted' ? "Convite aceito com sucesso!" : "Convite recusado.")
            onAction()
            onClose()
        } catch (error) {
            toast.error("Erro ao processar convite.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <S.Overlay>
            <S.ModalContainer>
                <S.Body>
                    <S.IconContainer>
                        <ShieldCheck size={32} />
                    </S.IconContainer>
                    <S.Title>Convite para Grupo</S.Title>
                    <S.SubTitle>
                        <S.StrongText>{inviterName}</S.StrongText> convidou você para compartilhar dados financeiros.
                    </S.SubTitle>
                    <S.Description>
                        Ao aceitar, vocês poderão ver as transações e metas um do outro. Você pode sair a qualquer momento.
                    </S.Description>

                    <S.ButtonGroup>
                        <S.RejectButton
                            onClick={() => handleAction('rejected')}
                            disabled={isLoading}
                        >
                            Recusar
                        </S.RejectButton>
                        <S.AcceptButton
                            onClick={() => handleAction('accepted')}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processando..." : "Aceitar e Entrar"}
                        </S.AcceptButton>
                    </S.ButtonGroup>
                </S.Body>
                <S.CloseButton onClick={onClose}>
                    <X size={20} />
                </S.CloseButton>
            </S.ModalContainer>
        </S.Overlay>
    )
}
