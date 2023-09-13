import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions // actions = actionCreators

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case "login/SET-IS-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }

// export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS" , status} as const)
// export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR" , error} as const)
// export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'login/SET-IS-INITIALIZED', isInitialized} as const)
//
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
// export type SetAppIsInitialized = ReturnType<typeof setIsInitializedAC>;
// type ActionsType = SetAppErrorActionType | SetAppStatusActionType | SetAppIsInitialized