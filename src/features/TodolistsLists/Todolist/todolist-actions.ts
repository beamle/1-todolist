import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../app/app-reducer";
import {todolistsAPI} from "./todolistsAPI";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../../common/utils/error-utitls";
import {setTodolistEntityStatusAC} from "./reducers/todolists-reducer";

// thunk creators
export const fetchTodolistTC = createAsyncThunk('todolists/fetchTodolistTC', async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        try {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolists: res.data}
        } catch (err: any) {
            const error: AxiosError = err;
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })
export const deleteTodolistTC = createAsyncThunk('todolists/deleteTodolistTC', async (todolistId: string, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(setTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
        const res = await todolistsAPI.deleteTodolist(todolistId)
        // try {
        //     if (res.data.resultCode === RESULT_CODE.Success) {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        dispatch(setTodolistEntityStatusAC({todolistId, status: 'succeeded'}))
        return {todolistId}
        //     } else {
        //         if (res.data.messages.length) {
        //             dispatch(setAppStatusAC({status: 'loading'}))
        //             dispatch(setTodolistEntityStatusAC({todolistId, status: "failed"}))
        //             return;
        //         } else {
        //             dispatch(setAppStatusAC({status: 'loading'}))
        //             dispatch(setAppErrorAC({error: "Something went wrong!"}))
        //             dispatch(setTodolistEntityStatusAC({todolistId, status: "failed"}))
        //             return;
        //         }
        //     }
        // }
        // catch (err){
        //     dispatch(setAppStatusAC({status: 'loading'}))
        //     return
        // }
    })
export const createTodolistTC = createAsyncThunk("todolists/createTodolistTC", async (title: string, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    // try {
    dispatch(setAppStatusAC({status: 'loading'}))
    return {todolist: res.data.data.item}
    // }
    // catch(err: any) {
    //     dispatch(setAppErrorAC(err.message))
    //     dispatch(setAppStatusAC({status: 'loading'}))
    // }
})
export const changeTodolistTitleTC = createAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>("todolists/changeTodolistTC", async ({todolistId, title}, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = todolistsAPI.updateTodolist(todolistId, title)

    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {title, todolistId}

})