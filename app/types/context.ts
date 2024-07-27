interface User {
    name: string;
    email: string;
    profileImageUrl: string;
}

export interface Context {
    user: User;
    currency: string;
}
