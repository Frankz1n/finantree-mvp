import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import finantreeIcon from "@/assets/finatree-icon.svg"
import * as S from "./Auth.styles"

export function Login() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error(t("authLogin.fillFields"))
            return
        }

        try {
            setIsLoading(true)
            await signIn(email, password)
            toast.success(t("authLogin.welcomeBack"))
            navigate("/dashboard")
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : t("authLogin.invalidCredentials")
            toast.error(message || t("authLogin.invalidCredentials"))
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
                    <S.Title>{t("authLogin.title")}</S.Title>
                    <S.Subtitle>{t("authLogin.subtitle")}</S.Subtitle>
                </S.Header>

                <S.Form onSubmit={handleSubmit}>
                    <S.InputGroup>
                        <S.Label>{t("authLogin.email")}</S.Label>
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

                    <S.InputGroup>
                        <S.Label>{t("authLogin.password")}</S.Label>
                        <S.InputWrapper>
                            <Lock size={18} />
                            <S.Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <S.PasswordToggle
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </S.PasswordToggle>
                        </S.InputWrapper>
                    </S.InputGroup>

                    <S.ForgotPasswordLink>
                        <Link to="/forgot-password">{t("authLogin.forgotPassword")}</Link>
                    </S.ForgotPasswordLink>

                    <S.SubmitButton type="submit" disabled={isLoading}>
                        {isLoading ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : t("authLogin.signIn")}
                    </S.SubmitButton>
                </S.Form>

                <S.Footer>
                    {t("authLogin.footer")}{' '}
                    <Link to="/register">{t("authLogin.signUp")}</Link>
                </S.Footer>
            </S.AuthCard>
        </S.AuthContainer>
    )
}
