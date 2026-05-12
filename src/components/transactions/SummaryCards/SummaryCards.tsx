import { useTranslation } from "react-i18next"
import { useMoneyFormat } from "@/hooks/useMoneyFormat"
import * as S from "./SummaryCards.styles"

interface SummaryCardsProps {
    spent: number
    income: number
    saved: number
}

export function SummaryCards({ spent, income, saved }: SummaryCardsProps) {
    const { t } = useTranslation()
    const formatMoney = useMoneyFormat()

    return (
        <S.Container>
            <S.CardWrapper>
                <S.CardLabel $color="#ef4444">{t("summaryCards.spent")}</S.CardLabel>
                <S.CardValue title={formatMoney(spent)}>{formatMoney(spent)}</S.CardValue>
            </S.CardWrapper>

            <S.CardWrapper>
                <S.CardLabel $color="#10b981">{t("summaryCards.income")}</S.CardLabel>
                <S.CardValue title={formatMoney(income)}>{formatMoney(income)}</S.CardValue>
            </S.CardWrapper>

            <S.CardWrapper>
                <S.CardLabel $color="#a855f7">{t("summaryCards.saved")}</S.CardLabel>
                <S.CardValue title={formatMoney(saved)}>{formatMoney(saved)}</S.CardValue>
            </S.CardWrapper>
        </S.Container>
    )
}
