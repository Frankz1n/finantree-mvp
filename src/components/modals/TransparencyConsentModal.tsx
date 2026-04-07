import { X, Users, Shield, ShieldCheck } from "lucide-react"
import * as S from "./TransparencyConsentModal.styles"

interface TransparencyConsentModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    onDecline: () => void
    hostName: string
}

export function TransparencyConsentModal({
    isOpen,
    onClose,
    onConfirm,
    onDecline,
    hostName
}: TransparencyConsentModalProps) {
    if (!isOpen) return null

    return (
        <S.Overlay>
            <S.ModalContainer>
                <S.CloseButton onClick={onClose}>
                    <X size={20} />
                </S.CloseButton>

                <S.ContentContainer>
                    <S.IconContainer>
                        <Users size={32} strokeWidth={2.5} />
                    </S.IconContainer>

                    <S.Title>
                        Entrar na Família de {hostName}?
                    </S.Title>

                    <S.Description>
                        {hostName} definiu este grupo com transparência <S.HighlightText>ABERTA</S.HighlightText>.
                        <br />
                        Você deseja compartilhar seu histórico de transações?
                    </S.Description>

                    <S.ButtonsContainer>
                        <S.ConfirmButton onClick={onConfirm}>
                            <ShieldCheck size={18} />
                            Sim, Compartilhar Tudo
                        </S.ConfirmButton>

                        <S.DeclineButton onClick={onDecline}>
                            <Shield size={18} />
                            Não, Manter Privado
                        </S.DeclineButton>
                    </S.ButtonsContainer>
                </S.ContentContainer>
            </S.ModalContainer>
        </S.Overlay>
    )
}
