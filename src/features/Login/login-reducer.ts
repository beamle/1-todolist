import {Dispatch} from "redux";
import {authAPI, LoginParams} from "./authAPI";
import {setAppStatusAC, setIsInitializedAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../common/utils/error-utitls";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../common/actions/common-actions";
import {RESULT_CODE} from "../../common/enums";
import {FieldsErrors} from "../../common/types/common-types";
import {AsyncThunkConfigType} from "../../app/store";


const slice = createSlice({
    name: "login",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn(stateDraft, action: PayloadAction<{ isLoggedIn: boolean }>) {
            stateDraft.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        // HERE IN extraReducer FULFILLED IS JUST A TYPE!!!!!!!!!!!!!!!
        builder
            .addCase(loginTC.fulfilled, (stateDraft, action) => {
                stateDraft.isLoggedIn = action.payload.isLoggedIn
            })
    }
})

export const loginReducer = slice.reducer;
export const {setIsLoggedIn} = slice.actions;

const createAsyncThunkType = createAsyncThunk.withTypes<{
    rejectValue: { error: string[], fieldsErrors?: FieldsErrors }
}>();


//TC
// or make generic and pass it as 3d type element: AsyncThunkConfigType<{error: string[], fieldsErrors: FieldsErrors}
export const loginTC = createAsyncThunkType<{ isLoggedIn: boolean }, LoginParams>("login/loginTC", async (params: LoginParams, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.login(params);
    try {
        if (res.data.resultCode === RESULT_CODE.Success) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({error: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(err, dispatch)
        return rejectWithValue({error: [error.message], fieldsErrors: undefined})
    }
})

export const logOutTC = createAsyncThunkType<{isLoggedIn: boolean}>("login/logOutTC", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.logout();
    try {
        if (res.data.resultCode === RESULT_CODE.Success) {
            dispatch(clearTasksAndTodolists())
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setIsInitializedAC({isInitialized: true}))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({error: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, dispatch)
        return rejectWithValue({error: [error.message], fieldsErrors: undefined})
    }
})

export const authMeTC = createAsyncThunkType<{isLoggedIn: boolean}>("login/authMeTC", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue } = thunkAPI;
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.authMe();
        try{
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(setIsInitializedAC({isInitialized: true}))
                return {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setIsInitializedAC({isInitialized: true}))
                return rejectWithValue({error: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        }
        catch(err: any) {
            const error: AxiosError = err;
            handleServerNetworkError(error as { message: string }, dispatch)
            dispatch(setIsInitializedAC({isInitialized: true}))
            return rejectWithValue({error: [error.message], fieldsErrors: undefined})
        }
})

//types

// type LoginThunkDispatchType = Dispatch<SetAppStatusActionType | SetAppErrorActionType | SetAppIsInitialized>
