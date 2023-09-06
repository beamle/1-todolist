import axios from "axios";
import { ResponseType } from "./todolistsAPI";

const settings = {
    withCredentials: true,
    "API-KEY": "7b095462-668f-44a3-9dd6-fc6dd090e3f3"
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})


export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        return instance.post<ResponseType<{userId: number}>>("auth/login", {email, password, rememberMe, captcha})
    }
}

//types
