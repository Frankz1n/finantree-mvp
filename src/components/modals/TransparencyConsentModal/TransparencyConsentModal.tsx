import { X, Users, Shield, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
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
    const { t } = useTranslation()
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

                    <S.Title>{t("transparency.title", { host: hostName })}</S.Title>

                    <S.Description>
                        {t("transparency.description", { host: hostName })}
                    </S.Description>

                    <S.ButtonsContainer>
                        <S.ConfirmButton onClick={onConfirm}>
                            <ShieldCheck size={18} />
                            {t("transparency.confirm")}
                        </S.ConfirmButton>

                        <S.DeclineButton onClick={onDecline}>
                            <Shield size={18} />
                            {t("transparency.decline")}
                        </S.DeclineButton>
                    </S.ButtonsContainer>
                </S.ContentContainer>
            </S.ModalContainer>
        </S.Overlay>
    )
}
