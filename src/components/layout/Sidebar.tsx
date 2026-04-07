import { Home, Wallet, User, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom"
import finantreeIcon from "@/assets/finatree-icon.svg"
import * as S from "./Sidebar.styles"

interface SidebarItemProps {
    icon: React.ElementType
    label: string
    active?: boolean
    onClick?: () => void
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
    return (
        <S.NavItemButton onClick={onClick} $active={active}>
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            {label}
        </S.NavItemButton>
    )
}

export function Sidebar() {
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await signOut()
        navigate("/login")
    }

    const menuItems = [
        { icon: Home, label: "Home", path: "/dashboard" },
        { icon: Wallet, label: "Statements", path: "/extract" },
        { icon: User, label: "Profile", path: "/profile" },
    ]

    return (
        <S.SidebarContainer>
            {/* Logo */}
            <S.LogoSection>
                <S.LogoIconWrapper>
                    <img src={finantreeIcon} alt="Finantree Logo" style={{ height: '1.5rem', width: '1.5rem', objectFit: 'contain' }} />
                </S.LogoIconWrapper>
                <S.LogoText>Finantree</S.LogoText>
            </S.LogoSection>

            <S.Nav>
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                    />
                ))}
            </S.Nav>

            <S.FooterSection>
                <S.LogoutButton onClick={handleLogout}>
                    <LogOut size={20} />
                    Logout
                </S.LogoutButton>
            </S.FooterSection>
        </S.SidebarContainer>
    )
}
