import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Loader2, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import finantreeIcon from "@/assets/finatree-icon.svg"
import * as S from "./Auth.styles"

export function ForgotPassword() {
    const navigate = useNavigate()
    const { resetPassword } = useAuth()

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            toast.error("Please enter your email")
            return
        }

        try {
            setIsLoading(true)
            await resetPassword(email)
            setIsSent(true)
            toast.success("Password reset instructions sent!")
        } catch (error: any) {
            toast.error(error?.message || "Failed to send reset email")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <S.AuthContainer>
            <S.AuthCard>
                <S.Header>
                    <S.LogoWrapper>
                        <img src={finantreeIcon} alt="Finantree Logo" />
                    </S.LogoWrapper>
                    <S.Title>Reset Password</S.Title>
                    <S.Subtitle>
                        {isSent ? "Check your email for reset instructions." : "We'll send you instructions to reset your password."}
                    </S.Subtitle>
                </S.Header>

                {!isSent ? (
                    <S.Form onSubmit={handleSubmit}>
                        <S.InputGroup>
                            <S.Label>Email</S.Label>
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
                                {isLoading ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : "Send Instructions"}
                            </S.SubmitButton>
                        </div>
                    </S.Form>
                ) : (
                    <S.Form onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
                        <S.SubmitButton type="button" onClick={() => navigate('/login')}>
                            Return to Login
                        </S.SubmitButton>
                    </S.Form>
                )}

                <S.Footer>
                    <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <ArrowLeft size={16} />
                        Back to sign in
                    </Link>
                </S.Footer>
            </S.AuthCard>
        </S.AuthContainer>
    )
}
