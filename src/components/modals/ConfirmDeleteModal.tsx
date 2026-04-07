import { AlertTriangle, Loader2 } from "lucide-react"
import { useState } from "react"
import * as S from "./ConfirmDeleteModal.styles"

interface ConfirmDeleteModalProps {
    isOpen: boolean
    title: string
    description: string
    onConfirm: () => Promise<void>
    onClose: () => void
}

export function ConfirmDeleteModal({ isOpen, title, description, onConfirm, onClose }: ConfirmDeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    if (!isOpen) return null

    const handleConfirm = async () => {
        setIsDeleting(true)
        try {
            await onConfirm()
        } finally {
            setIsDeleting(false)
            onClose()
        }
    }

    return (
        <S.Overlay>
            <S.ModalContainer>
                <S.Body>
                    <S.IconContainer>
                        <AlertTriangle size={32} />
                    </S.IconContainer>

                    <S.Title>{title}</S.Title>
                    <S.Description>{description}</S.Description>

                    <S.ButtonGroup>
                        <S.ConfirmButton onClick={handleConfirm} disabled={isDeleting}>
                            {isDeleting ? <Loader2 className="animate-spin" /> : "Sim, excluir"}
                        </S.ConfirmButton>

                        <S.CancelButton onClick={onClose} disabled={isDeleting}>
                            Cancelar
                        </S.CancelButton>
                    </S.ButtonGroup>
                </S.Body>
            </S.ModalContainer>
        </S.Overlay>
    )
}
