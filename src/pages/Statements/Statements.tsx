import { Search, Download, Calendar, ArrowUpRight, ArrowDownRight, ArrowRightLeft } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Statements.styles';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useMoneyFormat } from '@/hooks/useMoneyFormat';
import { appLanguageToBcp47 } from '@/lib/i18nLocale';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

type TransactionTypeFilter = 'all' | 'income' | 'expense';
const ALL_MONTHS_VALUE = 'all';
type StatementTransaction = {
    id: string;
    created_at: string;
    user_id: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    date: string;
    status: 'paid' | 'pending';
    category_id: string | null;
    categories?: { name?: string | null } | null;
};

const getMonthValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};

const parseUTCDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split('T')[0].split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
};

const escapeCSVValue = (value: string | number) => {
    const stringValue = String(value ?? '');
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

export function Statements() {
    const { t, i18n } = useTranslation();
    const formatMoney = useMoneyFormat();
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<StatementTransaction[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(getMonthValue(new Date()));
    const [transactionType, setTransactionType] = useState<TransactionTypeFilter>('all');
    const [isLoading, setIsLoading] = useState(true);

    const intlLocale = useMemo(() => appLanguageToBcp47(i18n.language), [i18n.language]);

    const toCSVDate = useCallback(
        (isoDate: string) =>
            new Intl.DateTimeFormat(intlLocale, {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                timeZone: 'UTC',
            }).format(parseUTCDate(isoDate)),
        [intlLocale],
    );

    const toGroupDate = useCallback(
        (isoDate: string) =>
            new Intl.DateTimeFormat(intlLocale, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
            }).format(parseUTCDate(isoDate)),
        [intlLocale],
    );

    const monthValueToLabel = useCallback(
        (monthValue: string) => {
            if (monthValue === ALL_MONTHS_VALUE) return t('statements.allMonths');
            const [year, month] = monthValue.split('-').map(Number);
            return new Intl.DateTimeFormat(intlLocale, {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
            }).format(new Date(Date.UTC(year, month - 1, 1)));
        },
        [intlLocale, t],
    );

    const getCategoryLabel = useCallback(
        (transaction: StatementTransaction) =>
            transaction.categories?.name || transaction.category_id || t('statements.general'),
        [t],
    );

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user) {
                setTransactions([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            const { data, error } = await supabase
                .from('transactions')
                .select('id, created_at, user_id, amount, type, description, date, status, category_id, categories(name)')
                .eq('user_id', user.id)
                .order('date', { ascending: false });

            if (error) {
                console.error('Error loading statements transactions:', error);
                setTransactions([]);
                setIsLoading(false);
                return;
            }

            setTransactions((data || []) as StatementTransaction[]);
            setIsLoading(false);
        };

        fetchTransactions();

        const onTransactionUpdated = () => fetchTransactions();
        window.addEventListener('transaction_updated', onTransactionUpdated);

        return () => {
            window.removeEventListener('transaction_updated', onTransactionUpdated);
        };
    }, [user]);

    const typeIncomeLabel = t('statements.typeIncome');
    const typeExpenseLabel = t('statements.typeExpense');

    const filteredTransactions = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const incomeSearch = typeIncomeLabel.toLowerCase();
        const expenseSearch = typeExpenseLabel.toLowerCase();

        return transactions.filter((transaction) => {
            const transactionMonth = transaction.date.slice(0, 7);
            const monthMatch = selectedMonth === ALL_MONTHS_VALUE ? true : transactionMonth === selectedMonth;

            const typeMatch =
                transactionType === 'all'
                    ? true
                    : transactionType === 'income'
                        ? transaction.type === 'income'
                        : transaction.type === 'expense';

            const searchMatch =
                normalizedSearch.length === 0
                    ? true
                    : transaction.description.toLowerCase().includes(normalizedSearch) ||
                    getCategoryLabel(transaction).toLowerCase().includes(normalizedSearch) ||
                    transaction.type.toLowerCase().includes(normalizedSearch) ||
                    incomeSearch.includes(normalizedSearch) ||
                    expenseSearch.includes(normalizedSearch);

            return monthMatch && typeMatch && searchMatch;
        });
    }, [
        transactions,
        selectedMonth,
        transactionType,
        searchTerm,
        getCategoryLabel,
        typeIncomeLabel,
        typeExpenseLabel,
    ]);

    const { totalIn, totalOut, netFlow } = useMemo(() => {
        const inValue = filteredTransactions
            .filter((transaction) => transaction.type === 'income')
            .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

        const outValue = filteredTransactions
            .filter((transaction) => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

        return {
            totalIn: inValue,
            totalOut: outValue,
            netFlow: inValue - outValue,
        };
    }, [filteredTransactions]);

    const groupedTransactions = useMemo(() => {
        return filteredTransactions.reduce((acc, transaction) => {
            const dateKey = toGroupDate(transaction.date);
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(transaction);
            return acc;
        }, {} as Record<string, StatementTransaction[]>);
    }, [filteredTransactions, toGroupDate]);

    const selectedMonthLabel = useMemo(() => {
        if (!selectedMonth || selectedMonth === ALL_MONTHS_VALUE) return t('statements.allMonths');
        const [year, month] = selectedMonth.split('-').map(Number);
        const labelDate = new Date(Date.UTC(year, month - 1, 1));
        return new Intl.DateTimeFormat(intlLocale, {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(labelDate);
    }, [selectedMonth, intlLocale, t]);

    const monthOptions = useMemo(() => {
        const availableMonths = Array.from(
            new Set(transactions.map((transaction) => transaction.date.slice(0, 7))),
        ).sort((a, b) => b.localeCompare(a));

        if (selectedMonth !== ALL_MONTHS_VALUE && !availableMonths.includes(selectedMonth)) {
            availableMonths.unshift(selectedMonth);
        }

        return [ALL_MONTHS_VALUE, ...availableMonths];
    }, [transactions, selectedMonth]);

    const handleExportCSV = () => {
        if (filteredTransactions.length === 0) return;

        const header = [
            t('statements.csvDate'),
            t('statements.csvDescription'),
            t('statements.csvCategory'),
            t('statements.csvType'),
            t('statements.csvAmount'),
        ];
        const rows = filteredTransactions.map((transaction) => [
            toCSVDate(transaction.date),
            transaction.description,
            getCategoryLabel(transaction),
            transaction.type === 'income' ? typeIncomeLabel : typeExpenseLabel,
            formatMoney(Math.abs(transaction.amount)),
        ]);

        const csvContent = [
            header.map(escapeCSVValue).join(','),
            ...rows.map((row) => row.map(escapeCSVValue).join(',')),
        ].join('\n');

        const fileMonth =
            selectedMonth === ALL_MONTHS_VALUE
                ? 'all_months'
                : (() => {
                    const [year, month] = selectedMonth.split('-');
                    return new Intl.DateTimeFormat(intlLocale, {
                        month: 'long',
                        timeZone: 'UTC',
                    })
                        .format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)))
                        .toLowerCase();
                })();
        const fileYear = selectedMonth === ALL_MONTHS_VALUE ? new Date().getUTCFullYear() : selectedMonth.split('-')[0];

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `finantree_statement_${fileMonth}_${fileYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const filterPills: { key: TransactionTypeFilter; label: string }[] = [
        { key: 'all', label: t('statements.typeAll') },
        { key: 'income', label: typeIncomeLabel },
        { key: 'expense', label: typeExpenseLabel },
    ];

    const kpis = useMemo(
        () => [
            {
                label: t('statements.totalIn'),
                value: formatMoney(Math.abs(totalIn)),
                color: '#059669',
                icon: ArrowUpRight,
            },
            {
                label: t('statements.totalOut'),
                value: `-${formatMoney(Math.abs(totalOut))}`,
                color: '#0f172a',
                icon: ArrowDownRight,
            },
            {
                label: t('statements.netFlow'),
                value: `${netFlow >= 0 ? '+' : '-'}${formatMoney(Math.abs(netFlow))}`,
                color: netFlow >= 0 ? '#059669' : '#dc2626',
                icon: ArrowRightLeft,
            },
        ],
        [t, totalIn, totalOut, netFlow, formatMoney],
    );

    return (
        <S.Container>
            <S.Header>
                <S.Title>{t('statements.title')}</S.Title>
                <S.ExportButton onClick={handleExportCSV} disabled={filteredTransactions.length === 0}>
                    <Download size={18} />
                    {t('statements.exportCsv')}
                </S.ExportButton>
            </S.Header>

            <S.KPIGrid>
                {kpis.map((kpi) => (
                    <S.KPICard key={kpi.label}>
                        <S.KPIHeader>
                            <S.KPILabel>{kpi.label}</S.KPILabel>
                            <S.KPIIconWrapper $color={kpi.color}>
                                <kpi.icon size={16} />
                            </S.KPIIconWrapper>
                        </S.KPIHeader>
                        <S.KPIValue $color={kpi.color}>{kpi.value}</S.KPIValue>
                    </S.KPICard>
                ))}
            </S.KPIGrid>

            <S.Toolbar>
                <S.SearchWrapper>
                    <S.SearchIcon>
                        <Search size={18} />
                    </S.SearchIcon>
                    <S.SearchInput
                        type="text"
                        placeholder={t('statements.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </S.SearchWrapper>

                <S.DateFilter style={{ position: 'relative' }}>
                    <Calendar size={18} color="#94a3b8" />
                    <S.DateFilterText>{selectedMonthLabel}</S.DateFilterText>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        aria-label={t('statements.filterByMonth')}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: 0,
                            cursor: 'pointer',
                        }}
                    >
                        {monthOptions.map((monthValue) => (
                            <option key={monthValue} value={monthValue}>
                                {monthValueToLabel(monthValue)}
                            </option>
                        ))}
                    </select>
                </S.DateFilter>

                <S.FilterPills>
                    {filterPills.map((pill) => (
                        <S.FilterButton
                            key={pill.key}
                            onClick={() => setTransactionType(pill.key)}
                            $active={transactionType === pill.key}
                        >
                            {pill.label}
                        </S.FilterButton>
                    ))}
                </S.FilterPills>
            </S.Toolbar>

            <S.Ledger>
                {isLoading && (
                    <>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <S.DateGroup key={`loading-${index}`}>
                                <S.DateHeader>
                                    <S.DateLabel>{t('statements.loading')}</S.DateLabel>
                                    <S.DateDivider />
                                </S.DateHeader>
                                <S.TransactionListWrapper>
                                    <div style={{ padding: '1.25rem' }}>
                                        <Skeleton style={{ width: '100%', height: '74px', borderRadius: '16px' }} />
                                    </div>
                                    <div style={{ padding: '0 1.25rem 1.25rem' }}>
                                        <Skeleton style={{ width: '100%', height: '74px', borderRadius: '16px' }} />
                                    </div>
                                </S.TransactionListWrapper>
                            </S.DateGroup>
                        ))}
                    </>
                )}

                {!isLoading &&
                    Object.entries(groupedTransactions).map(([date, items]) => (
                        <S.DateGroup key={date}>
                            <S.DateHeader>
                                <S.DateLabel>{date}</S.DateLabel>
                                <S.DateDivider />
                            </S.DateHeader>

                            <S.TransactionListWrapper>
                                {items.map((item) => (
                                    <S.TransactionItem key={item.id}>
                                        <S.ItemInfo>
                                            <S.ItemIcon $type={item.type as 'income' | 'expense'}>
                                                {item.type === 'income' ? <ArrowUpRight size={22} /> : <ArrowDownRight size={22} />}
                                            </S.ItemIcon>
                                            <S.ItemDetails>
                                                <S.ItemDescription>{item.description}</S.ItemDescription>
                                                <S.ItemCategory>{getCategoryLabel(item)}</S.ItemCategory>
                                            </S.ItemDetails>
                                        </S.ItemInfo>

                                        <S.ItemAmount $type={item.type as 'income' | 'expense'}>
                                            {item.type === 'income' ? '+' : '-'}
                                            {formatMoney(Math.abs(item.amount))}
                                        </S.ItemAmount>
                                    </S.TransactionItem>
                                ))}
                            </S.TransactionListWrapper>
                        </S.DateGroup>
                    ))}
            </S.Ledger>

            {!isLoading && filteredTransactions.length === 0 && (
                <S.EmptyState>
                    <S.EmptyIcon>
                        <Search size={32} />
                    </S.EmptyIcon>
                    <S.EmptyTitle>{t('statements.noTransactionsTitle')}</S.EmptyTitle>
                    <S.EmptyText>{t('statements.noTransactionsHint')}</S.EmptyText>
                </S.EmptyState>
            )}
        </S.Container>
    );
}
