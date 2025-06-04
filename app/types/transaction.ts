export interface Transaction {
    description: string;
    date: Date;
    amount: number;
    currency: string;
    category: string; // FIXME: Category Type
    icon: number;
    uuid: string;
}
