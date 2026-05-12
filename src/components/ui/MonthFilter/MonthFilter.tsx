import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { format, addMonths, subMonths } from "date-fns"
import { getDateFnsLocale } from "@/lib/i18nLocale"
import * as S from "./MonthFilter.styles"

interface MonthFilterProps {
    selectedDate: Date
    onChange: (date: Date) => void
}

export function MonthFilter({ selectedDate, onChange }: MonthFilterProps) {
    const { t, i18n } = useTranslation()
    const dateLocale = useMemo(() => getDateFnsLocale(i18n.language), [i18n.language])

    const handlePrevious = () => {
        onChange(subMonths(selectedDate, 1))
    }

    const handleNext = () => {
        onChange(addMonths(selectedDate, 1))
    }

    return (
        <S.Container>
            <S.Button onClick={handlePrevious} title={t("monthFilter.prevMonth")}>
                <ChevronLeft size={20} />
            </S.Button>
            
            <S.TitleBox>
                <S.MonthYearText>
                    {format(selectedDate, "MMMM yyyy", { locale: dateLocale })}
                </S.MonthYearText>
            </S.TitleBox>

            <S.Button onClick={handleNext} title={t("monthFilter.nextMonth")}>
                <ChevronRight size={20} />
            </S.Button>
        </S.Container>
    )
}
