import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../features/Login/authAPI";
import {RESULT_CODE} from "../common/enums";
import {setIsLoggedIn} from "../features/Login/login-reducer";


const initialState: InitialStateType = {
    status: "idle",
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false
    } as InitialStateType,
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
    },
    extraReducers: builder => {
        builder
            .addCase(authMeTC.fulfilled, (state, action) => {
                state.isInitialized = true;
            })
    }
})

// TC

export const authMeTC = createAsyncThunk("login/authMeTC",  async (_, thunkAPI) => {
    const {dispatch, rejectWithValue } = thunkAPI;
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.authMe();
    // try{
        if (res.data.resultCode === RESULT_CODE.Success) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setIsInitializedAC({isInitialized: true}))
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            return; // return without anything still means authMeTC.fulfilled and not .rejected
        } else {
            // dispatch(setIsInitializedAC({isInitialized: true}))
    //         handleServerAppError(res.data, dispatch)
    //         dispatch(setIsInitializedAC({isInitialized: true}))
    //         return;
        }
    // }
    // catch(err: any) {
    //     const error: AxiosError = err;
    //     handleServerNetworkError(error as { message: string }, dispatch)
    //     dispatch(setIsInitializedAC({isInitialized: true}))
    //     return rejectWithValue({error: [error.message], fieldsErrors: undefined})
    // }
})

export const asyncActions = {
    authMeTC
}


export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions // actions = actionCreators
// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
