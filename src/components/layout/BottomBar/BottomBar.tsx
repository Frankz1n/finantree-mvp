import { Home, Wallet, Sparkles, User, Sprout, Trophy } from "lucide-react"
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
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems = [
        { icon: Home, label: "Início", path: "/dashboard" },
        { icon: Wallet, label: "Extrato", path: "/extract" },
        { icon: Sparkles, label: "Oráculo", path: "/oracle" },
        { icon: Sprout, label: "Jardim", path: "/garden" },
        { icon: Trophy, label: "Ranking", path: "/ranking" },
        { icon: User, label: "Perfil", path: "/profile" },
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
