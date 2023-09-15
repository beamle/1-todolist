import {Dispatch} from "redux";
import {authAPI, LoginParams} from "../../api/authAPI";
import {setAppStatusAC, setIsInitializedAC} from "../../app/app-reducer";
import {RESULT_CODE} from "../../api/todolistsAPI";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utitls";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/actions/common-actions";

let initialState = {
    isLoggedIn: false,
}

const slice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(stateDaft, action: PayloadAction<{value: boolean}>) {
            stateDaft.isLoggedIn = action.payload.value
        }
    },
})

export const loginReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;

// export const loginReducer = (state: LoginReducerInitStateType = initialState, action: LoginActionsType): LoginReducerInitStateType => {
//     switch (action.type) {
//         case "login/SET-IS-LOGGED-IN":
//             return {...state, isLoggedIn: action.value}
//         // action.data.resultCode === RESULT_CODE.Success
//         default:
//             return state
//     }
// }
//AC
// const setIsLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


//TC
export const loginTC = (values: LoginParams) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(values)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(clearTasksAndTodolists())
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}
export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.authMe()
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setIsLoggedIn({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err as {message: string}, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}

//types

// type LoginThunkDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType | SetAppIsInitialized>
