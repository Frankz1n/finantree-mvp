import { useState, useEffect } from 'react';
import { Plus, Wallet, TrendingUp } from "lucide-react"
import * as S from "./Home.styles"
import { TransactionModal } from "@/components/modals/TransactionModal/TransactionModal";
import { useAuth } from "@/hooks/useAuth";
import { TransactionService } from "@/services/transactions";
import { Transaction } from "@/types/finance";
import { MonthFilter } from "@/components/ui/MonthFilter/MonthFilter";
import { TransactionList } from "@/components/transactions/TransactionList/TransactionList";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export function Home() {
    const { user } = useAuth();
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [editTransactionData, setEditTransactionData] = useState<Transaction | null>(null);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clearingId, setClearingId] = useState<string | null>(null);

    const loadTransactions = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const data = await TransactionService.getTransactions(user.id, selectedDate);
            setTransactions(data as Transaction[]);
        } catch (e) {
            console.error("Failed to load transactions", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();

        const onTransactionUpdated = () => loadTransactions();
        window.addEventListener('transaction_updated', onTransactionUpdated);
        return () => window.removeEventListener('transaction_updated', onTransactionUpdated);
    }, [user, selectedDate]);

    const markTransactionAsCleared = async (id: string) => {
        if (clearingId) return; // prevent double-click while another is in flight

        // 1. Optimistic update — instantly reflect the change in both lists
        const previousTransactions = transactions;
        setTransactions(prev =>
            prev.map(t => t.id === id ? { ...t, status: 'paid' as const } : t)
        );
        setClearingId(id);

        try {
            // 2. Persist to Supabase
            await TransactionService.updateTransaction(id, { status: 'paid' });
            toast.success('Transaction cleared successfully!');
        } catch (e) {
            // 3. Rollback on error
            console.error('Failed to clear transaction:', e);
            setTransactions(previousTransactions);
            toast.error('Failed to clear transaction. Please try again.');
        } finally {
            setClearingId(null);
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            await TransactionService.deleteTransaction(id);
            loadTransactions();
        } catch (e) {
            console.error(e);
        }
    };

    const handleEdit = (transaction: Transaction) => {
        setEditTransactionData(transaction);
        if (transaction.type === 'income') {
            setIsIncomeModalOpen(true);
        } else {
            setIsExpenseModalOpen(true);
        }
    };

    const pending = transactions.filter(t => t.status === 'pending');

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const availableFunds = totalIncome - totalExpense;

    return (
        <S.HomeContainer>
            <S.HeaderArea>
                <S.TitleBlock>
                    <S.Title>Hi, {user?.user_metadata?.first_name || 'there'}! 👋</S.Title>
                    <S.Subtitle>Let's grow your wealth.</S.Subtitle>
                </S.TitleBlock>
                <MonthFilter selectedDate={selectedDate} onChange={setSelectedDate} />
            </S.HeaderArea>

            <S.MainContentGrid>
                <S.LeftColumn>
                    <S.AvailableFundsCard>
                        <S.TreeIconWrapper>🌳</S.TreeIconWrapper>
                        <S.FundsInfo>
                            <S.FundsLabel>AVAILABLE FUNDS</S.FundsLabel>
                            <S.FundsAmount $isNegative={availableFunds < 0}>{formatCurrency(availableFunds)}</S.FundsAmount>
                            <S.FundsPillsRow>
                                <S.FundPill $variant="green">Incomes: +{formatCurrency(totalIncome)}</S.FundPill>
                            </S.FundsPillsRow>
                        </S.FundsInfo>
                    </S.AvailableFundsCard>

                    <S.SectionOverview>
                        <S.SectionTitleWrapper>
                            <S.SectionTitle>Quick Actions</S.SectionTitle>
                        </S.SectionTitleWrapper>
                        <S.QuickActionsContainer>
                            <S.QuickActionButton $colorVariant="dark" onClick={() => { setEditTransactionData(null); setIsExpenseModalOpen(true) }}>
                                <S.ActionIconWrapper>
                                    <Plus size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>Add Expense</S.ActionLabel>
                            </S.QuickActionButton>

                            <S.QuickActionButton $colorVariant="green" onClick={() => { setEditTransactionData(null); setIsIncomeModalOpen(true) }}>
                                <S.ActionIconWrapper>
                                    <Wallet size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>Add Income</S.ActionLabel>
                            </S.QuickActionButton>

                            <S.QuickActionButton $colorVariant="purple">
                                <S.ActionIconWrapper>
                                    <TrendingUp size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>New Goal</S.ActionLabel>
                            </S.QuickActionButton>
                        </S.QuickActionsContainer>
                    </S.SectionOverview>

                    {pending.length > 0 && (
                        <S.RecentActivityCard style={{ marginTop: '24px' }}>
                            <S.SectionTitleWrapper>
                                <S.SectionTitle>Upcoming Bills / Pending</S.SectionTitle>
                            </S.SectionTitleWrapper>
                            {isLoading ? <p style={{ padding: '16px' }}>Loading...</p> : (
                                <TransactionList
                                    transactions={pending}
                                    onEdit={handleEdit}
                                    onDelete={deleteTransaction}
                                    onMarkAsPaid={markTransactionAsCleared}
                                    clearingId={clearingId}
                                />
                            )}
                        </S.RecentActivityCard>
                    )}
                </S.LeftColumn>

                <S.RightColumn>
                    <S.RecentActivityCard>
                        <S.SectionTitleWrapper>
                            <S.SectionTitle>Recent Activity</S.SectionTitle>
                            <S.SeeAllLink>See All ({transactions.length})</S.SeeAllLink>
                        </S.SectionTitleWrapper>

                        {isLoading ? <p style={{ padding: '16px' }}>Loading...</p> : (
                            <TransactionList
                                transactions={transactions}
                                onEdit={handleEdit}
                                onDelete={deleteTransaction}
                            />
                        )}
                    </S.RecentActivityCard>
                </S.RightColumn>
            </S.MainContentGrid>

            <TransactionModal
                isOpen={isIncomeModalOpen}
                onClose={() => setIsIncomeModalOpen(false)}
                type="income"
                onSuccess={() => { }}
                initialData={editTransactionData}
            />
            <TransactionModal
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
                type="expense"
                onSuccess={() => { }}
                initialData={editTransactionData}
            />
        </S.HomeContainer>
    )
}
