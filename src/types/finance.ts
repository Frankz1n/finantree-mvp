export interface Category {
    id: string;
    created_at: string;
    user_id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
}

export type TransactionStatus = 'paid' | 'pending';

export interface TransactionCategoryJoin {
    id?: string;
    name?: string;
    color?: string;
    icon?: string;
}

export interface Transaction {
    id: string;
    created_at: string;
    user_id: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    category?: string;
    category_id?: string | null;
    date: string; // ISO String mapping to timestamp
    status: TransactionStatus;
    categories?: TransactionCategoryJoin | null; // Left join (partial select)
}
