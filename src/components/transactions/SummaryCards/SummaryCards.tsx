import { formatCurrency } from "@/lib/utils"
import * as S from "./SummaryCards.styles"

interface SummaryCardsProps {
    spent: number
    income: number
    saved: number
}

export function SummaryCards({ spent, income, saved }: SummaryCardsProps) {
    return (
        <S.Container>
            <S.CardWrapper>
                <S.CardLabel $color="#ef4444">Total Spent</S.CardLabel>
                <S.CardValue title={formatCurrency(spent)}>{formatCurrency(spent)}</S.CardValue>
            </S.CardWrapper>

            <S.CardWrapper>
                <S.CardLabel $color="#10b981">Total Income</S.CardLabel>
                <S.CardValue title={formatCurrency(income)}>{formatCurrency(income)}</S.CardValue>
            </S.CardWrapper>

            <S.CardWrapper>
                <S.CardLabel $color="#a855f7">Saved</S.CardLabel>
                <S.CardValue title={formatCurrency(saved)}>{formatCurrency(saved)}</S.CardValue>
            </S.CardWrapper>
        </S.Container>
    )
}
