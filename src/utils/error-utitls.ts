import { Dispatch } from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType, TaskType} from "../api/todolistsAPI";
import {AxiosError} from "axios";


// if server response was 200 but it has ServerError message instead of data
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: "Something went wrong! Try again"}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

// if there is a network error, throw axiosError
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

// type HandleServerErrorsDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType>