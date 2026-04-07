import { useState, useEffect, useRef } from "react"
import { ArrowRightLeft, Loader2, Globe, Search, ChevronDown, Check } from "lucide-react"
import { CURRENCIES } from "@/constants/currencies"
import * as S from "./CurrencyConverterModal.styles"

interface CurrencyConverterModalProps {
    isOpen: boolean
    onClose: () => void
}

function CurrencyCombobox({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
        }
    }, [open])

    const selected = CURRENCIES.find(c => c.code === value)
    const filtered = CURRENCIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="relative w-full">
            <S.LabelGroup>{label}</S.LabelGroup>
            <S.ComboboxButton type="button" onClick={() => setOpen(!open)}>
                {selected ? (
                    <S.ComboboxContentWrapper>
                        <S.ComboboxFlag>{selected.flag}</S.ComboboxFlag>
                        <S.ComboboxText>{selected.code} - {selected.name}</S.ComboboxText>
                    </S.ComboboxContentWrapper>
                ) : 'Selecione...'}
                <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </S.ComboboxButton>

            {open && (
                <>
                    <S.ComboboxOverlay onClick={() => setOpen(false)} />
                    <S.ComboboxDropdown>
                        <S.SearchWrapper>
                            <Search size={16} className="text-slate-400 ml-1 shrink-0" />
                            <S.SearchInput
                                ref={inputRef}
                                type="text"
                                placeholder="Pesquisar..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </S.SearchWrapper>
                        <S.ListWrapper>
                            {filtered.length > 0 ? (
                                filtered.map(c => (
                                    <S.ListItemBtn
                                        key={c.code}
                                        type="button"
                                        $selected={value === c.code}
                                        onClick={() => {
                                            onChange(c.code)
                                            setOpen(false)
                                            setSearch('')
                                        }}
                                    >
                                        <S.ComboboxContentWrapper>
                                            <S.ComboboxFlag>{c.flag}</S.ComboboxFlag>
                                            <S.ComboboxText>{c.code} - {c.name}</S.ComboboxText>
                                        </S.ComboboxContentWrapper>
                                        {value === c.code && <Check size={16} className="shrink-0" />}
                                    </S.ListItemBtn>
                                ))
                            ) : (
                                <p className="text-center text-slate-400 text-sm py-4">Nenhuma moeda encontrada.</p>
                            )}
                        </S.ListWrapper>
                    </S.ComboboxDropdown>
                </>
            )}
        </div>
    )
}

export function CurrencyConverterModal({ isOpen, onClose }: CurrencyConverterModalProps) {
    const [amount, setAmount] = useState<string>('1')
    const [fromCurrency, setFromCurrency] = useState('EUR')
    const [toCurrency, setToCurrency] = useState('BRL')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [ratesCache, setRatesCache] = useState<Record<string, number>>({ BRL: 1 })

    useEffect(() => {
        if (isOpen) {
            fetchRates()
        }
    }, [isOpen, fromCurrency, toCurrency])

    const fetchRates = async () => {
        if (ratesCache[fromCurrency] && ratesCache[toCurrency] && !error) return

        setIsLoading(true)
        setError(null)
        try {
            const pairsToFetch: string[] = []
            if (fromCurrency !== 'BRL' && !ratesCache[fromCurrency]) pairsToFetch.push(`${fromCurrency}-BRL`)
            if (toCurrency !== 'BRL' && fromCurrency !== toCurrency && !ratesCache[toCurrency]) pairsToFetch.push(`${toCurrency}-BRL`)

            if (pairsToFetch.length > 0) {
                const response = await fetch(`https://economia.awesomeapi.com.br/last/${pairsToFetch.join(',')}`)
                if (!response.ok) throw new Error('Falha ao obter taxas')
                const data = await response.json()

                setRatesCache(prev => {
                    const newCache = { ...prev }
                    if (fromCurrency !== 'BRL' && data[`${fromCurrency}BRL`]) {
                        newCache[fromCurrency] = parseFloat(data[`${fromCurrency}BRL`].bid)
                    }
                    if (toCurrency !== 'BRL' && data[`${toCurrency}BRL`]) {
                        newCache[toCurrency] = parseFloat(data[`${toCurrency}BRL`].bid)
                    }
                    return newCache
                })
            }
        } catch (err) {
            setError('Não foi possível carregar as taxas.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSwap = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    const calculateResult = () => {
        if (!amount) return null
        const numAmount = Number(amount)
        if (isNaN(numAmount)) return null
        if (fromCurrency === toCurrency) return numAmount

        const rateFrom = ratesCache[fromCurrency]
        const rateTo = ratesCache[toCurrency]

        if (!rateFrom || !rateTo) return null

        const amountInBRL = numAmount * rateFrom
        return amountInBRL / rateTo
    }

    const result = calculateResult()
    const targetCurrencyInfo = CURRENCIES.find(c => c.code === toCurrency)

    if (!isOpen) return null;

    return (
        <S.DialogOverlay onClick={onClose}>
            <S.DialogContainer onClick={e => e.stopPropagation()}>
                <S.HeaderArea>
                    <S.HeaderTitle>
                        <Globe className="text-[#00C980]" />
                        Conversor de Moedas
                    </S.HeaderTitle>
                </S.HeaderArea>

                <S.FormContainer>
                    <S.InputGroup>
                        <S.LabelGroup>Valor a Converter</S.LabelGroup>
                        <S.AmountInput
                            type="number"
                            min="0"
                            step="any"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                        />
                    </S.InputGroup>

                    <S.PairsContainer>
                        <S.FieldWrapper>
                            <CurrencyCombobox
                                label="De"
                                value={fromCurrency}
                                onChange={setFromCurrency}
                            />
                        </S.FieldWrapper>

                        <S.SwapButtonWrapper>
                            <S.SwapButton onClick={handleSwap}>
                                <ArrowRightLeft size={16} />
                            </S.SwapButton>
                        </S.SwapButtonWrapper>

                        <S.FieldWrapper>
                            <CurrencyCombobox
                                label="Para"
                                value={toCurrency}
                                onChange={setToCurrency}
                            />
                        </S.FieldWrapper>
                    </S.PairsContainer>

                    <S.ResultBox>
                        {isLoading ? (
                            <S.LoadingBox>
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <S.LoadingText>Obtendo taxas...</S.LoadingText>
                            </S.LoadingBox>
                        ) : error ? (
                            <S.ErrorBox>
                                {error}
                                <div><S.RetryButton onClick={fetchRates}>Tentar novamente</S.RetryButton></div>
                            </S.ErrorBox>
                        ) : (
                            <S.ResultContent>
                                <S.ResultSubtitle>Resultado da Conversão</S.ResultSubtitle>
                                <S.ResultValue>
                                    {targetCurrencyInfo?.symbol} {result !== null ? result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
                                </S.ResultValue>
                                {ratesCache[fromCurrency] && ratesCache[toCurrency] && fromCurrency !== toCurrency && (
                                    <S.ExchangeRateDetail>
                                        1 {fromCurrency} = {(ratesCache[fromCurrency] / ratesCache[toCurrency]).toLocaleString('pt-BR', { maximumFractionDigits: 4 })} {toCurrency}
                                    </S.ExchangeRateDetail>
                                )}
                            </S.ResultContent>
                        )}
                    </S.ResultBox>

                    <S.DoneButton onClick={onClose}>
                        Concluído
                    </S.DoneButton>
                </S.FormContainer>
            </S.DialogContainer>
        </S.DialogOverlay>
    )
}
