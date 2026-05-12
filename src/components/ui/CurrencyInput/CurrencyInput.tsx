import React, { useMemo, useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useCurrency } from "@/contexts/CurrencyContext"
import { formatCurrency } from "@/lib/utils"
import { appLanguageToBcp47 } from "@/lib/i18nLocale"
import { Input } from "@/components/ui/Input/Input"

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    value: string | number
    onChange: (value: string) => void
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ value, onChange, className, placeholder, ...props }, ref) => {
        const { i18n } = useTranslation()
        const { currency } = useCurrency()
        const locale = useMemo(() => appLanguageToBcp47(i18n.language), [i18n.language])
        const [displayValue, setDisplayValue] = useState("")

        useEffect(() => {
            const numericValue = typeof value === "string" ? parseFloat(value) : value
            if (!isNaN(numericValue)) {
                setDisplayValue(formatCurrency(numericValue, locale, currency))
            } else {
                setDisplayValue("")
            }
        }, [value, locale, currency])

        const resolvedPlaceholder = useMemo(
            () => placeholder ?? formatCurrency(0, locale, currency),
            [placeholder, locale, currency],
        )

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value

            const onlyDigits = inputValue.replace(/\D/g, "")

            if (onlyDigits === "") {
                onChange("")
                return
            }

            const numericValue = parseFloat(onlyDigits) / 100
            onChange(numericValue.toString())
        }

        return (
            <Input
                {...props}
                ref={ref}
                value={displayValue}
                onChange={handleChange}
                className={className}
                placeholder={resolvedPlaceholder}
            />
        )
    }
)

CurrencyInput.displayName = "CurrencyInput"
