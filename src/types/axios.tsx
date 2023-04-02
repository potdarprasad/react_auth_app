import { AxiosInstance } from "axios";

export interface AxiosContextType{
    protectedAxios: AxiosInstance;
    publicAxios: AxiosInstance;
    isLoading: boolean;
}