import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, Loader2, User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import finantreeIcon from "@/assets/finatree-icon.svg"
import * as S from "./Auth.styles"

export function Register() {
    const navigate = useNavigate()
    const { signUp } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !email || !password) {
            toast.error("Please fill in all fields")
            return
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        try {
            setIsLoading(true)
            await signUp(email, password, name)
            toast.success("Account created successfully! Welcome to Finantree.")
            navigate("/dashboard")
        } catch (error: any) {
            toast.error(error?.message || "Failed to create account")
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
                    <S.Title>Create an account</S.Title>
                    <S.Subtitle>Start your wealth-building journey today.</S.Subtitle>
                </S.Header>

                <S.Form onSubmit={handleSubmit}>
                    <S.InputGroup>
                        <S.Label>Full Name</S.Label>
                        <S.InputWrapper>
                            <User size={18} />
                            <S.Input
                                type="text"
                                placeholder="Franklyn"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </S.InputWrapper>
                    </S.InputGroup>

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

                    <div style={{ marginTop: '0.5rem' }}>
                        <S.SubmitButton type="submit" disabled={isLoading}>
                            {isLoading ? <S.SpinnerIcon><Loader2 /></S.SpinnerIcon> : "Sign Up"}
                        </S.SubmitButton>
                    </div>
                </S.Form>

                <S.Footer>
                    Already have an account?
                    <Link to="/login">Sign in</Link>
                </S.Footer>
            </S.AuthCard>
        </S.AuthContainer>
    )
}
