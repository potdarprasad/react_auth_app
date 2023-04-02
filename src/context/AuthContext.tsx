import { ReactNode, createContext, useState } from "react";
import { AuthContextType, AuthState } from "../types/auth";

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = (props: { children: ReactNode }) => {
    const getUserId = () => localStorage.getItem('userId') as string;
    const getAccessToken = () => localStorage.getItem('accessToken') as string;
    const getRefreshToken = () => localStorage.getItem('refreshToken') as string;

    const [authState, setAuthState] = useState<AuthState>(() => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        const userId = getUserId();
        return {
            accessToken,
            refreshToken,
            userId
        } as AuthState;
    });

    const updateAuthState = (input: AuthState) => {
        setAuthState(input);
        localStorage.setItem('accessToken', input.accessToken);
        localStorage.setItem('refreshToken', input.refreshToken);
        localStorage.setItem('userId', input.userId);
    }


    return (
        <AuthContext.Provider value={{ authState, updateAuthState, getAccessToken, getRefreshToken }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

