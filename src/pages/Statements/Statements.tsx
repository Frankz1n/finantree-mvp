import { Search, Download, Calendar, ArrowUpRight, ArrowDownRight, ArrowRightLeft } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import * as S from './Statements.styles';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

type TransactionTypeFilter = 'All' | 'Income' | 'Expense';
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

const toCSVDate = (isoDate: string) => {
    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(parseUTCDate(isoDate));
};

const toGroupDate = (isoDate: string) => {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(parseUTCDate(isoDate));
};

const escapeCSVValue = (value: string | number) => {
    const stringValue = String(value ?? '');
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

const monthValueToLabel = (monthValue: string) => {
    if (monthValue === ALL_MONTHS_VALUE) return 'All months';
    const [year, month] = monthValue.split('-').map(Number);
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, 1)));
};

const getCategoryLabel = (transaction: StatementTransaction) => {
    return transaction.categories?.name || transaction.category_id || 'General';
};

export function Statements() {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<StatementTransaction[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(getMonthValue(new Date()));
    const [transactionType, setTransactionType] = useState<TransactionTypeFilter>('All');
    const [isLoading, setIsLoading] = useState(true);

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

    const filteredTransactions = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return transactions.filter((transaction) => {
            const transactionMonth = transaction.date.slice(0, 7);
            const monthMatch = selectedMonth === ALL_MONTHS_VALUE ? true : transactionMonth === selectedMonth;

            const typeMatch =
                transactionType === 'All'
                    ? true
                    : transactionType === 'Income'
                        ? transaction.type === 'income'
                        : transaction.type === 'expense';

            const searchMatch =
                normalizedSearch.length === 0
                    ? true
                    : transaction.description.toLowerCase().includes(normalizedSearch) ||
                    getCategoryLabel(transaction).toLowerCase().includes(normalizedSearch) ||
                    transaction.type.toLowerCase().includes(normalizedSearch);

            return monthMatch && typeMatch && searchMatch;
        });
    }, [transactions, selectedMonth, transactionType, searchTerm]);

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
    }, [filteredTransactions]);

    const selectedMonthLabel = useMemo(() => {
        if (!selectedMonth || selectedMonth === ALL_MONTHS_VALUE) return 'All months';
        const [year, month] = selectedMonth.split('-').map(Number);
        const labelDate = new Date(Date.UTC(year, month - 1, 1));
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        }).format(labelDate);
    }, [selectedMonth]);

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

        const header = ['Date', 'Description', 'Category', 'Type', 'Amount'];
        const rows = filteredTransactions.map((transaction) => [
            toCSVDate(transaction.date),
            transaction.description,
            getCategoryLabel(transaction),
            transaction.type === 'income' ? 'Income' : 'Expense',
            Math.abs(transaction.amount).toFixed(2),
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
                    return new Intl.DateTimeFormat('en-US', {
                        month: 'long',
                        timeZone: 'UTC',
                    }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1))).toLowerCase();
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

    const kpis = [
        { label: 'Total In', value: formatCurrency(Math.abs(totalIn)), color: '#059669', icon: ArrowUpRight },
        { label: 'Total Out', value: `-${formatCurrency(Math.abs(totalOut))}`, color: '#0f172a', icon: ArrowDownRight },
        { label: 'Net Flow', value: `${netFlow >= 0 ? '+' : '-'}${formatCurrency(Math.abs(netFlow))}`, color: netFlow >= 0 ? '#059669' : '#dc2626', icon: ArrowRightLeft },
    ];

    return (
        <S.Container>
            {/* Header */}
            <S.Header>
                <S.Title>Statements</S.Title>
                <S.ExportButton onClick={handleExportCSV} disabled={filteredTransactions.length === 0}>
                    <Download size={18} />
                    Export to CSV
                </S.ExportButton>
            </S.Header>

            {/* KPI Cards */}
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

            {/* Toolbar */}
            <S.Toolbar>
                <S.SearchWrapper>
                    <S.SearchIcon>
                        <Search size={18} />
                    </S.SearchIcon>
                    <S.SearchInput 
                        type="text" 
                        placeholder="Search transactions..."
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
                        aria-label="Filter by month"
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
                    {['All', 'Income', 'Expense'].map((type) => (
                        <S.FilterButton
                            key={type}
                            onClick={() => setTransactionType(type as TransactionTypeFilter)}
                            $active={transactionType === type}
                        >
                            {type}
                        </S.FilterButton>
                    ))}
                </S.FilterPills>
            </S.Toolbar>

            {/* Transaction Ledger */}
            <S.Ledger>
                {isLoading && (
                    <>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <S.DateGroup key={`loading-${index}`}>
                                <S.DateHeader>
                                    <S.DateLabel>Loading...</S.DateLabel>
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

                {!isLoading && Object.entries(groupedTransactions).map(([date, items]) => (
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
                                        {item.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(item.amount))}
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
                    <S.EmptyTitle>No transactions found</S.EmptyTitle>
                    <S.EmptyText>No transactions found. Try adjusting your filters.</S.EmptyText>
                </S.EmptyState>
            )}
        </S.Container>
    );
}
