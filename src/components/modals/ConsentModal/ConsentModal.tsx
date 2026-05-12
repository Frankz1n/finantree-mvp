import { useState } from "react"
import { useTranslation } from "react-i18next"
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
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null

    const handleAction = async (status: 'accepted' | 'rejected') => {
        try {
            setIsLoading(true)
            await SharingService.respondToInvite(inviteId, status)
            toast.success(status === 'accepted' ? t("consent.accepted") : t("consent.rejected"))
            onAction()
            onClose()
        } catch {
            toast.error(t("consent.error"))
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
                    <S.Title>{t("consent.title")}</S.Title>
                    <S.SubTitle>{t("consent.subtitle", { name: inviterName })}</S.SubTitle>
                    <S.Description>{t("consent.description")}</S.Description>

                    <S.ButtonGroup>
                        <S.RejectButton
                            onClick={() => handleAction('rejected')}
                            disabled={isLoading}
                        >
                            {t("consent.reject")}
                        </S.RejectButton>
                        <S.AcceptButton
                            onClick={() => handleAction('accepted')}
                            disabled={isLoading}
                        >
                            {isLoading ? t("consent.processing") : t("consent.accept")}
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
