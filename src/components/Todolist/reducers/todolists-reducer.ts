import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../../api/todolistsAPI";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TD-TITLE"
    todolistId: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-FILTER"
    todolistId: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: "SET-TODOLISTS"
    todolists: TodolistType[]
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType

export let todoListId1 = v1()
export let todoListId2 = v1()

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initalState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initalState, action: ActionsType): TodolistDomainType[] => {
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

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist }
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TD-TITLE', todolistId, title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-FILTER', todolistId, filter}
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return { type: "SET-TODOLISTS", todolists }
}

// export const fetchTodolistThunk = (dispatch: Dispatch) => {
//     todolistsAPI.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })
// }

export const fetchTodolistTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => dispatch(removeTodolistAC(todolistId)))
    }
}

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => dispatch(addTodolistAC(res.data.data.item)))
    }
}

export const changeTodolistTitleTH = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => dispatch(changeTodolistTitleAC(title, todolistId)))
    }
}