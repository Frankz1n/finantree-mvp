import { Transaction } from "@/types/finance"
import { formatCurrency } from "@/lib/utils"
import { Calendar, Pencil, Trash2 } from "lucide-react"
import * as S from "./TransactionList.styles"

interface TransactionListProps {
    transactions: Transaction[]
    onEdit?: (transaction: Transaction) => void
    onDelete?: (id: string) => void
}

const TransactionList = ({ transactions, onEdit, onDelete }: TransactionListProps) => {

    const groupedTransactions = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.due_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
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
                <S.EmptyStateTitle>Nenhuma transação encontrada</S.EmptyStateTitle>
                <S.EmptyStateText>Tente ajustar seus filtros ou busca.</S.EmptyStateText>
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
                                        <S.TransactionStatus>
                                            {t.status === 'completed' ? 'APROVADO' : 'PENDENTE'}
                                        </S.TransactionStatus>
                                        <S.TransactionDot />
                                        <S.TransactionCategory>
                                            {t.categories?.name || 'Geral'}
                                        </S.TransactionCategory>
                                    </S.TransactionMetaRow>
                                </S.TransactionDetails>
                                <S.TransactionActionsArea>
                                    <S.TransactionAmount $type={t.type as 'income' | 'expense'}>
                                        {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                                    </S.TransactionAmount>

                                    {(onEdit || onDelete) && (
                                        <S.ActionsGroup className="actions-group">
                                            {onEdit && (
                                                <S.IconButton
                                                    $variant="edit"
                                                    onClick={() => onEdit(t)}
                                                    title="Editar"
                                                >
                                                    <Pencil size={14} />
                                                </S.IconButton>
                                            )}
                                            {onDelete && (
                                                <S.IconButton
                                                    $variant="delete"
                                                    onClick={() => onDelete(t.id)}
                                                    title="Excluir"
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
