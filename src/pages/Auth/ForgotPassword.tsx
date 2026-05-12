import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Loader2, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import finantreeIcon from "@/assets/finatree-icon.svg"
import * as S from "./Auth.styles"

export function ForgotPassword() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { resetPassword } = useAuth()

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            toast.error(t("authForgot.enterEmail"))
            return
        }

        try {
            setIsLoading(true)
            await resetPassword(email)
            setIsSent(true)
            toast.success(t("authForgot.resetSent"))
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : t("authForgot.resetFailed")
            toast.error(message || t("authForgot.resetFailed"))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <S.AuthContainer>
            <S.AuthCard>
                <S.Header>
                    <S.LogoWrapper>
                        <img src={finantreeIcon} alt={t("nav.logoAlt")} />
                    </S.LogoWrapper>
                    <S.Title>{t("authForgot.title")}</S.Title>
                    <S.Subtitle>
                        {isSent ? t("authForgot.subtitleAfter") : t("authForgot.subtitleBefore")}
                    </S.Subtitle>
                </S.Header>

                {!isSent ? (
                    <S.Form onSubmit={handleSubmit}>
                        <S.InputGroup>
                            <S.Label>{t("authForgot.email")}</S.Label>
                            <S.InputWrapper>
                                <Mail size={18} />
                                <S.Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </S.InputWrapper>
                        </S.InputGroup>

                        <div style={{ marginTop: '0.5rem' }}>
                            <S.SubmitButton type="submit" disabled={isLoading}>
                                {isLoading ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : t("authForgot.sendInstructions")}
                            </S.SubmitButton>
                        </div>
                    </S.Form>
                ) : (
                    <S.Form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
                        <S.SubmitButton type="button" onClick={() => navigate('/login')}>
                            {t("authForgot.returnLogin")}
                        </S.SubmitButton>
                    </S.Form>
                )}

                <S.Footer>
                    <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <ArrowLeft size={16} />
                        {t("authForgot.backToSignIn")}
                    </Link>
                </S.Footer>
            </S.AuthCard>
        </S.AuthContainer>
    )
}
