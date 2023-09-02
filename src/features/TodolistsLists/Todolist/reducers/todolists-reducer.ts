import {v1} from "uuid";
import {RESULT_CODE, todolistsAPI, TodolistType} from "../../../../api/todolistsAPI";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../../../app/app-reducer";

const initalState: TodolistDomainType[] = [];

export const todolistsReducer = (state: TodolistDomainType[] = initalState, action: TodolistActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist = {...action.todolist, filter: <FilterValuesType> 'all', entityStatus: <RequestStatusType> 'idle'}
            return [...state, newTodolist]
        case "CHANGE-TD-TITLE":
            return state.map(ts => ts.id === action.todolistId ? {...ts, title: action.title} : ts)
        case "CHANGE-FILTER":
            return state.map(ts => ts.id === action.todolistId ? {...ts, filter: action.filter} : ts)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: "all", entityStatus: 'idle'}
            })
        case "SET-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        }
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
export const setTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => ({type: "SET-ENTITY-STATUS", todolistId, status} as const)

// thunk creators
export const fetchTodolistTC = () => (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
export const deleteTodolistTC = (todolistId: string) => (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setTodolistEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === RESULT_CODE.Success) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(setTodolistEntityStatusAC(todolistId, 'succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppStatusAC("failed"))
                        dispatch(setTodolistEntityStatusAC(todolistId, "failed"))
                    } else {
                        dispatch(setAppStatusAC("failed"))
                        dispatch(setAppErrorAC("Something went wrong!"))
                        dispatch(setTodolistEntityStatusAC(todolistId, "failed"))
                    } dispatch(setAppStatusAC("failed"))
                }
            })
    }
export const createTodolistTC = (title: string) => (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('loading'))
            })
            .catch(err => {
                dispatch(setAppErrorAC(err.message))
                dispatch(setAppStatusAC('failed'))
            })
    }
export const changeTodolistTitleTH = (todolistId: string, title: string) => (dispatch: ThunkDispatchType) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(title, todolistId))
                dispatch(setAppStatusAC('succeeded'))
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

export type TodolistActionsType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType
    | SetTodolistEntityStatusType

type ThunkDispatchType = Dispatch<TodolistActionsType | SetAppStatusActionType | SetAppErrorActionType>