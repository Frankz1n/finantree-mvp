import { Sidebar } from "../Sidebar/Sidebar"
import { BottomBar } from "../BottomBar/BottomBar"
import * as S from "./DashboardLayout.styles"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <S.Container>
            <Sidebar />
            <BottomBar />
            <S.MainContent>
                <S.ContentWrapper>
                    {children}
                </S.ContentWrapper>
            </S.MainContent>
        </S.Container>
    )
}
