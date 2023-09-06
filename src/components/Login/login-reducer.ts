import {Dispatch} from "redux";
import {loginAPI} from "../../api/loginAPI";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {RESULT_CODE} from "../../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utitls";

let initialState: LoginReducerInitStateType = {
    email: '',
    password: '',
    rememberMe: '',
    captcha: '',
    isLoggedIn: false

}

export const loginReducer = (state: LoginReducerInitStateType = initialState, action: LoginActionsType): LoginReducerInitStateType => {
    switch (action.type) {

        default:
            return state
    }
}
//AC
const setIsLoggedIn = (userId: number) => ({type: 'SET-IS-LOGGED-IN', userId} as const)

//TC
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: LoginThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.login(email, password, rememberMe)
        .then(res => {
            if(res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn(res.data.data.userId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

//types
type LoginReducerInitStateType = {
    email: string
    password: string
    rememberMe: string
    captcha?: string
    isLoggedIn: boolean
}

type LoginActionsType = ReturnType<typeof setIsLoggedIn>

type LoginThunkDispatchType = Dispatch<LoginActionsType | SetAppStatusActionType | SetAppErrorActionType>
