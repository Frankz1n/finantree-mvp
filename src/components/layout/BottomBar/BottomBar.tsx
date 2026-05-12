import { Home, Wallet, Repeat, Sprout, User } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router-dom"
import * as S from "./BottomBar.styles"

interface BottomBarItemProps {
    icon: React.ElementType
    label: string
    active?: boolean
    onClick?: () => void
}

const BottomBarItem = ({ icon: Icon, label, active, onClick }: BottomBarItemProps) => {
    return (
        <S.ItemButton onClick={onClick} $active={active}>
            <S.IconWrapper $active={active}>
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            </S.IconWrapper>
            <S.ItemLabel $active={active}>
                {label}
            </S.ItemLabel>
        </S.ItemButton>
    )
}

export function BottomBar() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { icon: Home, label: t("nav.home"), path: "/dashboard" },
        { icon: Wallet, label: t("nav.statements"), path: "/extract" },
        { icon: Repeat, label: t("nav.recurring"), path: "/recurring" },
        { icon: Sprout, label: t("nav.garden"), path: "/garden" },
        { icon: User, label: t("nav.profile"), path: "/profile" },
    ]

    return (
        <S.Container>
            {menuItems.map((item) => (
                <BottomBarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                />
            ))}
        </S.Container>
    )
}
