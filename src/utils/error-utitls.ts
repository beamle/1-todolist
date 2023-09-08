import { Dispatch } from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType, TaskType} from "../api/todolistsAPI";
import {AxiosError} from "axios";

// TODO: po4emu nelzja sjuda importitj dispatch, a dolzhny ego prinimatj 4erez parametry?

// if server response was 200 but it has ServerError message instead of data
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: HandleServerErrorsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Something went wrong! Try again"))
    }
    dispatch(setAppStatusAC('failed'))
}

// if there is a network error, throw axiosError
export const handleServerNetworkError = (error: { message: string }, dispatch: HandleServerErrorsDispatchType) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

type HandleServerErrorsDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType>