import {TodolistType} from "../todolistsAPI";
import {RequestStatusType,} from "../../../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../common/actions/common-actions";
import {changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, fetchTodolistTC} from "../todolist-actions";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ todoListId: string, filter: FilterValuesType }>) {
            const index = state.findIndex(td => td.id === action.payload.todoListId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        setTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
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


export const todolistsReducer = slice.reducer;
export const {changeTodolistFilterAC, setTodolistEntityStatusAC} = slice.actions;


// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
