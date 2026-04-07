import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import finantreeIcon from "@/assets/finatree-icon.svg"
import * as S from "./Auth.styles"

export function Login() {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Please fill in all fields")
            return
        }

        try {
            setIsLoading(true)
            await signIn(email, password)
            toast.success("Welcome back!")
            navigate("/dashboard")
        } catch (error: any) {
            toast.error(error?.message || "Invalid email or password")
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
                    <S.Title>Welcome back</S.Title>
                    <S.Subtitle>Enter your details to access your account.</S.Subtitle>
                </S.Header>

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

                    <S.InputGroup>
                        <S.Label>Password</S.Label>
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
                        <Link to="/forgot-password">Forgot password?</Link>
                    </S.ForgotPasswordLink>

                    <S.SubmitButton type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                    </S.SubmitButton>
                </S.Form>

                <S.Footer>
                    Don't have an account?
                    <Link to="/register">Sign up</Link>
                </S.Footer>
            </S.AuthCard>
        </S.AuthContainer>
    )
}
