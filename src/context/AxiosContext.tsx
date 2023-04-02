import { ReactNode, createContext, useContext, useState } from "react";
import { AxiosContextType } from "../types/axios";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const AxiosContext = createContext<AxiosContextType>({} as AxiosContextType);
const { Provider } = AxiosContext;

const AxiosProvider = (props: { children: ReactNode }) => {
    const { getAccessToken, getRefreshToken, updateAuthState } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const baseUrl = 'http://127.0.0.1:4000/api/';

    const protectedAxios = axios.create({
        baseURL: baseUrl
    });

    protectedAxios.interceptors.request.use(config => {
        setIsLoading(true);
        if (!config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${getAccessToken()}`
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });

    protectedAxios.interceptors.response.use((response) => {
        setIsLoading(false);
        return response;
    }, async (err) => {
        setIsLoading(false);
        if (err.response.status === 401) {
            const accessToken = await handleRefreshTokenExpired();
            err.config.headers["Authorization"] = `bearer ${accessToken}`;
            return axios(err.config);
        } else {
            return Promise.reject(err);
        }
    });

    const handleRefreshTokenExpired = async () => {
        const { data } = await axios.get(`${baseUrl}auth/refresh`, {
            headers: {
                Authorization: `Bearer ${getRefreshToken()}`
            }
        });

        updateAuthState({ refreshToken: data.refreshToken, accessToken: data.accessToken, userId: '' });

        return data.accessToken;
    }

    const publicAxios = axios.create({
        baseURL: baseUrl
    });

    return <Provider value={{ protectedAxios, publicAxios, isLoading }}>
        {props.children}
    </Provider>
};

export { AxiosContext, AxiosProvider };