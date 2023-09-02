import { Dispatch } from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {TaskResponseType, TaskType} from "../api/todolistsAPI";
import {AxiosError} from "axios";

// TODO: po4emu nelzja sjuda importitj dispatch, a dolzhny ego prinimatj 4erez parametry?

export const handleServerAppError = <T>(data: TaskResponseType<T>, dispatch: HandleServerErrorsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Something went wrong! Try again"))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (err: AxiosError, dispatch: HandleServerErrorsDispatchType) => {
    dispatch(setAppErrorAC(err.message))
    dispatch(setAppStatusAC('failed'))
}

type HandleServerErrorsDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType>