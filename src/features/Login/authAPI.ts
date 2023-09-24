import axios from "axios";
import { ResponseType } from "../../common/types/common-types";

const settings = {
    withCredentials: true,
    "API-KEY": "7b095462-668f-44a3-9dd6-fc6dd090e3f3"
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const authAPI = {
    login(loginData: LoginParams) {
        return instance.post<ResponseType<{userId: number}>>("auth/login", loginData)
    },
    logout() {
        return instance.delete<ResponseType>("auth/login")
    },
    authMe() {
        return instance.get<ResponseType<{id: number, email: string, login: string}>>("auth/me")
    },
}

//types
export type LoginParams = {
    email: string
    password: string,
    rememberMe: boolean
    captcha?: string
}
