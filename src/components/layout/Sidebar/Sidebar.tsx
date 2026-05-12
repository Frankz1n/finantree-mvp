import { Home, Wallet, User, LogOut, Repeat, Sprout, PieChart } from "lucide-react"
import { useTranslation } from "react-i18next"
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
    const { t } = useTranslation()
    const { signOut } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = async () => {
        await signOut()
        navigate("/login")
    }

    const menuItems = [
        { icon: Home, label: t("nav.home"), path: "/dashboard" },
        { icon: PieChart, label: t("nav.analytics"), path: "/analytics" },
        { icon: Wallet, label: t("nav.statements"), path: "/extract" },
        { icon: Repeat, label: t("nav.recurring"), path: "/recurring" },
        { icon: Sprout, label: t("nav.garden"), path: "/garden" },
        { icon: User, label: t("nav.profile"), path: "/profile" },
    ]

    return (
        <S.SidebarContainer>
            {/* Logo */}
            <S.LogoSection>
                <S.LogoIconWrapper>
                    <img src={finantreeIcon} alt={t("nav.logoAlt")} style={{ height: '1.5rem', width: '1.5rem', objectFit: 'contain' }} />
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
                    {t("nav.logout")}
                </S.LogoutButton>
            </S.FooterSection>
        </S.SidebarContainer>
    )
}
