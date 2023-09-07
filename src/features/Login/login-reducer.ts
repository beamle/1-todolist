import {Dispatch} from "redux";
import {authAPI, LoginParams} from "../../api/authAPI";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {ResponseType, RESULT_CODE} from "../../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utitls";
import {AxiosError} from "axios";

let initialState: LoginReducerInitStateType = {
    isLoggedIn: false,
    authenticated: false

}

export const loginReducer = (state: LoginReducerInitStateType = initialState, action: LoginActionsType): LoginReducerInitStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        case "login/SET-AUTH-ME":
            return {...state, authenticated: action.data.resultCode === RESULT_CODE.Success }
        default:
            return state
    }
}
//AC
const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
const setAuthMe = (data: ResponseType) => ({type: 'login/SET-AUTH-ME', data} as const)

//TC
export const loginTC = (values: LoginParams) => (dispatch: LoginThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(values)
        .then(res => {
            if(res.data.resultCode === RESULT_CODE.Success) {
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

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then(res => {
            if(res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setAuthMe(res.data))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedIn(true))
            }
            else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

//types
type LoginReducerInitStateType = {
    // email: string
    // password: string
    // rememberMe: string
    // captcha?: string
    isLoggedIn: boolean
    authenticated: boolean
}

type LoginActionsType = ReturnType<typeof setIsLoggedIn> | ReturnType<typeof setAuthMe>

type LoginThunkDispatchType = Dispatch<LoginActionsType | SetAppStatusActionType | SetAppErrorActionType>
