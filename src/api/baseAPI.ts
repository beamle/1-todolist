import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "7b095462-668f-44a3-9dd6-fc6dd090e3f3"
    }
}

export const instance = axios.create( {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})
