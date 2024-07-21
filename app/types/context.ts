interface User {
    name: string;
    email: string;
}

export interface Context {
    user: User;
    currency: string;
}
