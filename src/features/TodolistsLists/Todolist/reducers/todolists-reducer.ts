import {RESULT_CODE, todolistsAPI, TodolistType} from "../../../../api/todolistsAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC,} from "../../../../app/app-reducer";
import {handleServerNetworkError} from "../../../../utils/error-utitls";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../common/actions/common-actions";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistId)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(td => td.id === action.payload.todoListId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        setTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistId)
            if(index > -1 ){
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearTasksAndTodolists, (state, action) => {
                // to see current state:
                // console.log(current(state))
                return []
            })
    }
})


export const todolistsReducer = slice.reducer;
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    setTodolistEntityStatusAC,
} = slice.actions;


// thunk creators
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(res => {
            handleServerNetworkError(res, dispatch)
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(setTodolistEntityStatusAC({todolistId: todolistId, status: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(removeTodolistAC({todolistId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(setTodolistEntityStatusAC({todolistId, status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppStatusAC({status: 'loading'}))
                    dispatch(setTodolistEntityStatusAC({todolistId, status: "failed"}))
                } else {
                    dispatch(setAppStatusAC({status: 'loading'}))
                    dispatch(setAppErrorAC({error: "Something went wrong!"}))
                    dispatch(setTodolistEntityStatusAC({todolistId, status: "failed"}))
                }
                dispatch(setAppStatusAC({status: 'loading'}))
            }
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'loading'}))
        })
        .catch(err => {
            dispatch(setAppErrorAC(err.message))
            dispatch(setAppStatusAC({status: 'loading'}))
        })
}
export const changeTodolistTitleTH = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC({title, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}


// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type SetTodolistEntityStatusType = ReturnType<typeof setTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

// export type TodolistActionsType = RemoveTodolistActionType | AddTodolistActionType |
//     ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType
//     | SetTodolistEntityStatusType
//
// type ThunkDispatchType = Dispatch