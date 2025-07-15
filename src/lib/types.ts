interface UserProfile {
    name: string;
    username: string;
    email: string;
    email_verified: boolean;
    two_factor_enabled: boolean;
    date_joined: string;
    last_login: string;
}

export type {UserProfile}