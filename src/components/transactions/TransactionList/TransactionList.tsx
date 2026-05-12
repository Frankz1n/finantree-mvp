import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Transaction } from "@/types/finance"
import { useMoneyFormat } from "@/hooks/useMoneyFormat"
import { appLanguageToBcp47 } from "@/lib/i18nLocale"
import { Calendar, Pencil, Trash2, Check, Loader2 } from "lucide-react"
import * as S from "./TransactionList.styles"

interface TransactionListProps {
    transactions: Transaction[]
    onEdit?: (transaction: Transaction) => void
    onDelete?: (id: string) => void
    onMarkAsPaid?: (id: string) => void
    clearingId?: string | null
}

const TransactionList = ({ transactions, onEdit, onDelete, onMarkAsPaid, clearingId }: TransactionListProps) => {
    const { t, i18n } = useTranslation()
    const formatMoney = useMoneyFormat()
    const intlLocale = useMemo(() => appLanguageToBcp47(i18n.language), [i18n.language])

    const groupedTransactions = transactions.reduce((acc, transaction) => {
        const [year, month, day] = transaction.date.split('T')[0].split('-').map(Number);
        const utcDate = new Date(Date.UTC(year, month - 1, day));
        const date = new Intl.DateTimeFormat(intlLocale, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(utcDate);
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {} as Record<string, Transaction[]>);

    if (transactions.length === 0) {
        return (
            <S.EmptyStateWrapper>
                <S.EmptyStateIcon>
                    🔍
                </S.EmptyStateIcon>
                <S.EmptyStateTitle>{t('transactionList.noTitle')}</S.EmptyStateTitle>
                <S.EmptyStateText>{t('transactionList.noHint')}</S.EmptyStateText>
            </S.EmptyStateWrapper>
        )
    }

    return (
        <S.Container>
            {Object.entries(groupedTransactions).map(([date, items]) => (
                <S.DateGroupWrapper key={date}>
                    <S.DateGroupHeader>
                        <S.DateGroupTitle>
                            <Calendar size={14} /> {date}
                        </S.DateGroupTitle>
                        <S.DateGroupCount>{items.length}</S.DateGroupCount>
                    </S.DateGroupHeader>

                    <S.TransactionsListWrapper>
                        {items.map((tItem) => (
                            <S.TransactionItem key={tItem.id}>
                                <S.TransactionIconWrapper $type={tItem.type as 'income' | 'expense'}>
                                    <S.TransactionIconText>{tItem.categories?.icon || '📄'}</S.TransactionIconText>
                                </S.TransactionIconWrapper>
                                <S.TransactionDetails>
                                    <S.TransactionDescription>{tItem.description}</S.TransactionDescription>
                                    <S.TransactionMetaRow>
                                        {tItem.status === 'pending' ? (
                                            <S.TransactionStatus>
                                                {t('transactionList.pending').toUpperCase()}
                                            </S.TransactionStatus>
                                        ) : (
                                            <S.TransactionStatus $cleared>
                                                {t('transactionList.cleared').toUpperCase()}
                                            </S.TransactionStatus>
                                        )}
                                        <S.TransactionDot />
                                        <S.TransactionCategory>
                                            {tItem.categories?.name || t('statements.general')}
                                        </S.TransactionCategory>
                                    </S.TransactionMetaRow>
                                </S.TransactionDetails>
                                <S.TransactionActionsArea>
                                    <S.TransactionAmount $type={tItem.type as 'income' | 'expense'}>
                                        {tItem.type === 'expense' ? '-' : '+'}{formatMoney(tItem.amount)}
                                    </S.TransactionAmount>

                                    {(onEdit || onDelete || (onMarkAsPaid && tItem.status === 'pending')) && (
                                        <S.ActionsGroup>
                                            {onMarkAsPaid && tItem.status === 'pending' && (
                                                <S.IconButton
                                                    $variant="edit" 
                                                    onClick={() => onMarkAsPaid(tItem.id)}
                                                    title={t('transactionList.markCleared')}
                                                    disabled={clearingId === tItem.id}
                                                    style={{
                                                        color: '#10b981',
                                                        backgroundColor: '#d1fae5',
                                                        opacity: clearingId === tItem.id ? 0.7 : 1,
                                                        cursor: clearingId === tItem.id ? 'not-allowed' : 'pointer',
                                                    }}
                                                >
                                                    {clearingId === tItem.id
                                                        ? <S.SpinnerIcon><Loader2 size={14} /></S.SpinnerIcon>
                                                        : <Check size={14} />}
                                                </S.IconButton>
                                            )}
                                            {onEdit && (
                                                <S.IconButton
                                                    $variant="edit"
                                                    onClick={() => onEdit(tItem)}
                                                    title={t('transactionList.edit')}
                                                >
                                                    <Pencil size={14} />
                                                </S.IconButton>
                                            )}
                                            {onDelete && (
                                                <S.IconButton
                                                    $variant="delete"
                                                    onClick={() => onDelete(tItem.id)}
                                                    title={t('transactionList.delete')}
                                                >
                                                    <Trash2 size={14} />
                                                </S.IconButton>
                                            )}
                                        </S.ActionsGroup>
                                    )}
                                </S.TransactionActionsArea>
                            </S.TransactionItem>
                        ))}
                    </S.TransactionsListWrapper>
                </S.DateGroupWrapper>
            ))}
        </S.Container>
    )
}

export { TransactionList }
