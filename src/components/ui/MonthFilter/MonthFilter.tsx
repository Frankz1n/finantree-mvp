import { ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths } from "date-fns"
import * as S from "./MonthFilter.styles"

interface MonthFilterProps {
    selectedDate: Date
    onChange: (date: Date) => void
}

export function MonthFilter({ selectedDate, onChange }: MonthFilterProps) {
    const handlePrevious = () => {
        onChange(subMonths(selectedDate, 1))
    }

    const handleNext = () => {
        onChange(addMonths(selectedDate, 1))
    }

    return (
        <S.Container>
            <S.Button onClick={handlePrevious} title="Mês Anterior">
                <ChevronLeft size={20} />
            </S.Button>
            
            <S.TitleBox>
                <S.MonthYearText>
                    {format(selectedDate, "MMMM yyyy")}
                </S.MonthYearText>
            </S.TitleBox>

            <S.Button onClick={handleNext} title="Próximo Mês">
                <ChevronRight size={20} />
            </S.Button>
        </S.Container>
    )
}
