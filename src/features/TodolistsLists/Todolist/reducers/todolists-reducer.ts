import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../../api/todolistsAPI";
import {Dispatch} from "redux";

const initalState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initalState, action: TodolistActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist = {...action.todolist, filter: <FilterValuesType> 'all'}
            return [...state, newTodolist]
        case "CHANGE-TD-TITLE":
            return state.map(ts => ts.id === action.todolistId ? {...ts, title: action.title} : ts)
        case "CHANGE-FILTER":
            return state.map(ts => ts.id === action.todolistId ? {...ts, filter: action.filter} : ts)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "all"}
            })
        default:
            return state
    }
}


// action creators
export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) => ({ type: 'CHANGE-TD-TITLE', todolistId, title} as const)
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({ type: 'CHANGE-FILTER', todolistId, filter} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists } as const)

// thunk creators
export const fetchTodolistTC = () => (dispatch: Dispatch<TodolistActionsType>) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionsType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => dispatch(removeTodolistAC(todolistId)))
    }
export const createTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
        todolistsAPI.createTodolist(title)
            .then(res => dispatch(addTodolistAC(res.data.data.item)))
    }
export const changeTodolistTitleTH = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistActionsType>) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => dispatch(changeTodolistTitleAC(title, todolistId)))
    }


// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TodolistActionsType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType