import {todolistsAPI, TodolistType} from "../todolistsAPI";
import {RequestStatusType, setAppStatusAC,} from "../../../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../common/actions/common-actions";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../../../common/utils/error-utitls";

const initialState: TodolistDomainType[] = [];

export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(td => td.id === action.payload.todoListId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        setTodolistEntityStatus(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(td => td.id === action.payload?.todolistId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(td => td.id === action.payload.todolistId)
                if (index > -1) {
                    state[index].title = action.payload.title
                }
            })
            .addCase(clearTasksAndTodolists, (state, action) => {
                // to see current state:
                // console.log(current(state))
                return []
            })
    }
})

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
    dispatch(setTodolistEntityStatus({todolistId: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    // try {
    //     if (res.data.resultCode === RESULT_CODE.Success) {
    dispatch(setAppStatusAC({status: 'succeeded'}))
    dispatch(setTodolistEntityStatus({todolistId, status: 'succeeded'}))
    return {todolistId}
    //     } else {
    //         if (res.data.messages.length) {
    //             dispatch(setAppStatusAC({status: 'loading'}))
    //             dispatch(setTodolistEntityStatus({todolistId, status: "failed"}))
    //             return;
    //         } else {
    //             dispatch(setAppStatusAC({status: 'loading'}))
    //             dispatch(setAppErrorAC({error: "Something went wrong!"}))
    //             dispatch(setTodolistEntityStatus({todolistId, status: "failed"}))
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
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'loading'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (err: any) {
        const error: AxiosError = err;
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const changeTodolistTitleTC = createAsyncThunk<{ todolistId: string, title: string }, { todolistId: string, title: string }>("todolists/changeTodolistTC", async ({
                                                                                                                                                                             todolistId,
                                                                                                                                                                             title
                                                                                                                                                                         }, {dispatch}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = todolistsAPI.updateTodolist(todolistId, title)

    dispatch(setAppStatusAC({status: 'succeeded'}))
    return {title, todolistId}

})

export const asyncActions = {
    fetchTodolistTC,
    deleteTodolistTC,
    createTodolistTC,
    changeTodolistTitleTC
}
export const todolistsReducer = slice.reducer;
export const {changeTodolistFilter, setTodolistEntityStatus} = slice.actions;


// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
