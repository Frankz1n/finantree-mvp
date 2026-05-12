import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Wallet, TrendingUp } from "lucide-react"
import * as S from "./Home.styles"
import { TransactionModal } from "@/components/modals/TransactionModal/TransactionModal";
import { AddGoalModal } from "@/components/modals/AddGoalModal/AddGoalModal";
import { useAuth } from "@/hooks/useAuth";
import { TransactionService } from "@/services/transactions";
import { buildGreetingDisplayName, getCurrentUserProfile, type PublicUserProfileRow } from "@/services/users";
import { Transaction } from "@/types/finance";
import { MonthFilter } from "@/components/ui/MonthFilter/MonthFilter";
import { TransactionList } from "@/components/transactions/TransactionList/TransactionList";
import { useMoneyFormat } from "@/hooks/useMoneyFormat";
import { toast } from "sonner";

export function Home() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const formatMoney = useMoneyFormat();
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
    const [editTransactionData, setEditTransactionData] = useState<Transaction | null>(null);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [clearingId, setClearingId] = useState<string | null>(null);
    const [userProfile, setUserProfile] = useState<PublicUserProfileRow | null>(null);

    const loadTransactions = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const data = await TransactionService.getTransactions(user.id, selectedDate);
            setTransactions(data as Transaction[]);
        } catch (e: unknown) {
            console.error("Failed to load transactions", e);
            const detail =
                e && typeof e === "object" && "message" in e && typeof (e as { message: unknown }).message === "string"
                    ? (e as { message: string }).message
                    : "";
            toast.error(detail ? `${t("home.loadTransactionsError")}: ${detail}` : t("home.loadTransactionsError"));
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

    useEffect(() => {
        if (!user) {
            setUserProfile(null);
            return;
        }
        let cancelled = false;
        void getCurrentUserProfile(user.id).then((row) => {
            if (!cancelled) setUserProfile(row);
        });
        return () => {
            cancelled = true;
        };
    }, [user]);

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
            toast.success(t('home.transactionCleared'));
        } catch (e) {
            // 3. Rollback on error
            console.error('Failed to clear transaction:', e);
            setTransactions(previousTransactions);
            toast.error(t('home.transactionClearFailed'));
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

    const greetingName = user
        ? buildGreetingDisplayName(user, userProfile, t('home.greetingFallback'))
        : t('home.greetingFallback');

    const pending = transactions.filter(t => t.status === 'pending');

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const availableFunds = totalIncome - totalExpense;

    return (
        <S.HomeContainer>
            <S.HeaderArea>
                <S.TitleBlock>
                    <S.Title>
                        {t('home.greeting', { name: greetingName })}
                    </S.Title>
                    <S.Subtitle>{t('home.subtitle')}</S.Subtitle>
                </S.TitleBlock>
                <MonthFilter selectedDate={selectedDate} onChange={setSelectedDate} />
            </S.HeaderArea>

            <S.MainContentGrid>
                <S.LeftColumn>
                    <S.AvailableFundsCard>
                        <S.TreeIconWrapper>🌳</S.TreeIconWrapper>
                        <S.FundsInfo>
                            <S.FundsLabel>{t('home.availableFunds')}</S.FundsLabel>
                            <S.FundsAmount $isNegative={availableFunds < 0}>{formatMoney(availableFunds)}</S.FundsAmount>
                            <S.FundsPillsRow>
                                <S.FundPill $variant="green">
                                    {t('home.incomesLabel', { amount: formatMoney(totalIncome) })}
                                </S.FundPill>
                            </S.FundsPillsRow>
                        </S.FundsInfo>
                    </S.AvailableFundsCard>

                    <S.SectionOverview>
                        <S.SectionTitleWrapper>
                            <S.SectionTitle>{t('home.quickActions')}</S.SectionTitle>
                        </S.SectionTitleWrapper>
                        <S.QuickActionsContainer>
                            <S.QuickActionButton $colorVariant="dark" onClick={() => { setEditTransactionData(null); setIsExpenseModalOpen(true) }}>
                                <S.ActionIconWrapper>
                                    <Plus size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>{t('home.addExpense')}</S.ActionLabel>
                            </S.QuickActionButton>

                            <S.QuickActionButton $colorVariant="green" onClick={() => { setEditTransactionData(null); setIsIncomeModalOpen(true) }}>
                                <S.ActionIconWrapper>
                                    <Wallet size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>{t('home.addIncome')}</S.ActionLabel>
                            </S.QuickActionButton>

                            <S.QuickActionButton type="button" $colorVariant="purple" onClick={() => setIsGoalModalOpen(true)}>
                                <S.ActionIconWrapper>
                                    <TrendingUp size={28} strokeWidth={2.5} />
                                </S.ActionIconWrapper>
                                <S.ActionLabel>{t('home.newGoal')}</S.ActionLabel>
                            </S.QuickActionButton>
                        </S.QuickActionsContainer>
                    </S.SectionOverview>

                    {pending.length > 0 && (
                        <S.RecentActivityCard style={{ marginTop: '24px' }}>
                            <S.SectionTitleWrapper>
                                <S.SectionTitle>{t('home.upcomingBills')}</S.SectionTitle>
                            </S.SectionTitleWrapper>
                            {isLoading ? <p style={{ padding: '16px' }}>{t('common.loading')}</p> : (
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
                            <S.SectionTitle>{t('home.recentActivity')}</S.SectionTitle>
                            <S.SeeAllLink>{t('home.seeAll', { count: transactions.length })}</S.SeeAllLink>
                        </S.SectionTitleWrapper>

                        {isLoading ? <p style={{ padding: '16px' }}>{t('common.loading')}</p> : (
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
                onClose={() => {
                    setIsIncomeModalOpen(false)
                    setEditTransactionData(null)
                }}
                type="income"
                onSuccess={() => { }}
                initialData={editTransactionData}
            />
            <TransactionModal
                isOpen={isExpenseModalOpen}
                onClose={() => {
                    setIsExpenseModalOpen(false)
                    setEditTransactionData(null)
                }}
                type="expense"
                onSuccess={() => { }}
                initialData={editTransactionData}
            />

            <AddGoalModal isOpen={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)} />
        </S.HomeContainer>
    )
}
