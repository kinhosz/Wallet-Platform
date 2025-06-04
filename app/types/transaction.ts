export interface Transaction {
    description: string;
    date: Date;
    amount: number;
    currency: string;
    category: string;
    icon: number;
    uuid: string;
}
