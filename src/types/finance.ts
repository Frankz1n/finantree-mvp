export interface Category {
    id: string;
    created_at: string;
    user_id: string;
    name: string;
    type: 'income' | 'expense';
    icon: string;
}

export type TransactionStatus = 'paid' | 'pending';

export interface Transaction {
    id: string;
    created_at: string;
    user_id: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    category: string;
    date: string; // ISO String mapping to timestamp
    status: TransactionStatus;
    categories?: Category; // Left join
}
