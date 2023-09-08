import {Dispatch} from "redux";
import {authAPI, LoginParams} from "../../api/authAPI";
import {
    SetAppErrorActionType,
    SetAppIsInitialized,
    setAppStatusAC,
    SetAppStatusActionType,
    setIsInitializedAC
} from "../../app/app-reducer";
import {ResponseType, RESULT_CODE} from "../../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utitls";
import {AxiosError} from "axios";

let initialState: LoginReducerInitStateType = {
    isLoggedIn: false,
}

export const loginReducer = (state: LoginReducerInitStateType = initialState, action: LoginActionsType): LoginReducerInitStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        // action.data.resultCode === RESULT_CODE.Success
        default:
            return state
    }
}
//AC
const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


//TC
export const loginTC = (values: LoginParams) => (dispatch: LoginThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(values)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logOutTC = () => (dispatch: LoginThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

export const authMeTC = () => (dispatch: LoginThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err as {message: string}, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

//types
type LoginReducerInitStateType = {
    isLoggedIn: boolean
}

type LoginActionsType = ReturnType<typeof setIsLoggedIn>

type LoginThunkDispatchType = Dispatch<LoginActionsType |
    SetAppStatusActionType | SetAppErrorActionType | SetAppIsInitialized>
