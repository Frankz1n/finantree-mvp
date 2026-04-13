import { Search, Download, Calendar, ArrowUpRight, ArrowDownRight, ArrowRightLeft, FileText, ShoppingCart, Coffee, Home, Zap } from 'lucide-react';
import { useState } from 'react';
import * as S from './Statements.styles';

// Mock data
const mockKPIs = [
    { label: 'Total In', value: '$4,200.00', color: '#059669', icon: ArrowUpRight },
    { label: 'Total Out', value: '-$1,850.00', color: '#0f172a', icon: ArrowDownRight },
    { label: 'Net Flow', value: '+$2,350.00', color: '#059669', icon: ArrowRightLeft },
];

const mockTransactions = [
    {
        date: 'April 15, 2026',
        items: [
            { id: 1, description: 'Client Payment - Project X', category: 'Freelance', amount: 2500.00, type: 'income', icon: FileText },
            { id: 2, description: 'Monthly Rent', category: 'Housing', amount: -1200.00, type: 'expense', icon: Home },
        ]
    },
    {
        date: 'April 13, 2026',
        items: [
            { id: 3, description: 'Amazon.com', category: 'Shopping', amount: -65.40, type: 'expense', icon: ShoppingCart },
            { id: 4, description: 'Starbucks Coffee', category: 'Food & Drink', amount: -12.50, type: 'expense', icon: Coffee },
        ]
    },
    {
        date: 'April 10, 2026',
        items: [
            { id: 5, description: 'Electric Bill', category: 'Utilities', amount: -85.00, type: 'expense', icon: Zap },
            { id: 6, description: 'Dividends Deposit', category: 'Investment', amount: 150.00, type: 'income', icon: ArrowUpRight },
        ]
    }
];

export function Statements() {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <S.Container>
            {/* Header */}
            <S.Header>
                <S.Title>Statements</S.Title>
                <S.ExportButton>
                    <Download size={18} />
                    Export to CSV
                </S.ExportButton>
            </S.Header>

            {/* KPI Cards */}
            <S.KPIGrid>
                {mockKPIs.map((kpi) => (
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </S.SearchWrapper>

                <S.DateFilter>
                    <Calendar size={18} color="#94a3b8" />
                    <S.DateFilterText>April 2026</S.DateFilterText>
                </S.DateFilter>

                <S.FilterPills>
                    {['All', 'Income', 'Expense'].map((type) => (
                        <S.FilterButton
                            key={type}
                            onClick={() => setFilter(type)}
                            $active={filter === type}
                        >
                            {type}
                        </S.FilterButton>
                    ))}
                </S.FilterPills>
            </S.Toolbar>

            {/* Transaction Ledger */}
            <S.Ledger>
                {mockTransactions.map((group) => (
                    <S.DateGroup key={group.date}>
                        <S.DateHeader>
                            <S.DateLabel>{group.date}</S.DateLabel>
                            <S.DateDivider />
                        </S.DateHeader>

                        <S.TransactionListWrapper>
                            {group.items.map((item) => (
                                <S.TransactionItem key={item.id}>
                                    <S.ItemInfo>
                                        <S.ItemIcon $type={item.type as 'income' | 'expense'}>
                                            <item.icon size={22} />
                                        </S.ItemIcon>
                                        <S.ItemDetails>
                                            <S.ItemDescription>{item.description}</S.ItemDescription>
                                            <S.ItemCategory>{item.category}</S.ItemCategory>
                                        </S.ItemDetails>
                                    </S.ItemInfo>

                                    <S.ItemAmount $type={item.type as 'income' | 'expense'}>
                                        {item.type === 'income' ? '+' : ''}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}
                                    </S.ItemAmount>
                                </S.TransactionItem>
                            ))}
                        </S.TransactionListWrapper>
                    </S.DateGroup>
                ))}
            </S.Ledger>
            
            {/* Empty State Mockup */}
            {searchQuery && (
                <S.EmptyState>
                    <S.EmptyIcon>
                        <Search size={32} />
                    </S.EmptyIcon>
                    <S.EmptyTitle>No results for "{searchQuery}"</S.EmptyTitle>
                    <S.EmptyText>Try searching for something else or adjusting your filters.</S.EmptyText>
                </S.EmptyState>
            )}
        </S.Container>
    );
}
