export interface AuthState {
    accessToken: string;
    refreshToken: string;
    userId: string;
}

export interface AuthContextType {
    getAccessToken: () => string;
    getRefreshToken: () => string;
    updateAuthState: (authState: AuthState) => void;
    authState?: AuthState;
}