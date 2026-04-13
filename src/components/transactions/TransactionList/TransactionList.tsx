import { Transaction } from "@/types/finance"
import { formatCurrency } from "@/lib/utils"
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

    const groupedTransactions = transactions.reduce((acc, transaction) => {
        // Parse date as UTC to avoid timezone-shift (e.g. Apr 13 becoming Apr 12)
        const [year, month, day] = transaction.date.split('T')[0].split('-').map(Number);
        const utcDate = new Date(Date.UTC(year, month - 1, day));
        const date = new Intl.DateTimeFormat('en-US', {
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
                <S.EmptyStateTitle>No transactions found</S.EmptyStateTitle>
                <S.EmptyStateText>Try adjusting your filters or add a new transaction.</S.EmptyStateText>
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
                        {items.map((t) => (
                            <S.TransactionItem key={t.id}>
                                <S.TransactionIconWrapper $type={t.type as 'income' | 'expense'}>
                                    <S.TransactionIconText>{t.categories?.icon || '📄'}</S.TransactionIconText>
                                </S.TransactionIconWrapper>
                                <S.TransactionDetails>
                                    <S.TransactionDescription>{t.description}</S.TransactionDescription>
                                    <S.TransactionMetaRow>
                                        {t.status === 'pending' ? (
                                            <S.TransactionStatus>
                                                PENDING
                                            </S.TransactionStatus>
                                        ) : (
                                            <S.TransactionStatus $cleared>
                                                CLEARED
                                            </S.TransactionStatus>
                                        )}
                                        <S.TransactionDot />
                                        <S.TransactionCategory>
                                            {t.categories?.name || 'General'}
                                        </S.TransactionCategory>
                                    </S.TransactionMetaRow>
                                </S.TransactionDetails>
                                <S.TransactionActionsArea>
                                    <S.TransactionAmount $type={t.type as 'income' | 'expense'}>
                                        {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                                    </S.TransactionAmount>

                                    {(onEdit || onDelete || (onMarkAsPaid && t.status === 'pending')) && (
                                        <S.ActionsGroup>
                                            {onMarkAsPaid && t.status === 'pending' && (
                                                <S.IconButton
                                                    $variant="edit" 
                                                    onClick={() => onMarkAsPaid(t.id)}
                                                    title="Mark as Cleared"
                                                    disabled={clearingId === t.id}
                                                    style={{
                                                        color: '#10b981',
                                                        backgroundColor: '#d1fae5',
                                                        opacity: clearingId === t.id ? 0.7 : 1,
                                                        cursor: clearingId === t.id ? 'not-allowed' : 'pointer',
                                                    }}
                                                >
                                                    {clearingId === t.id
                                                        ? <S.SpinnerIcon><Loader2 size={14} /></S.SpinnerIcon>
                                                        : <Check size={14} />}
                                                </S.IconButton>
                                            )}
                                            {onEdit && (
                                                <S.IconButton
                                                    $variant="edit"
                                                    onClick={() => onEdit(t)}
                                                    title="Edit"
                                                >
                                                    <Pencil size={14} />
                                                </S.IconButton>
                                            )}
                                            {onDelete && (
                                                <S.IconButton
                                                    $variant="delete"
                                                    onClick={() => onDelete(t.id)}
                                                    title="Delete"
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
