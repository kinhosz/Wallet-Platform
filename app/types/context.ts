interface User {
    name: string;
    email: string;
}

export interface Context {
    user: User;
    month: string;
    currency: string;
}
