import {FilterValuesType, TodoListType} from "../../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string

}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.id)
        case "ADD-TODOLIST":
            const newTodolist = {id: v1(), title: action.title, filter: <FilterValuesType> 'all'}
            return [...state, newTodolist]
        case "CHANGE-TITLE":
            return state.map(ts => ts.id === action.id ? {...ts, title: action.title} : ts)
        case "CHANGE-FILTER":
            return state.map(ts => ts.id === action.id ? {...ts, filter: action.filter} : ts)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TITLE', id: todolistId, title}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-FILTER', id: todolistId, filter}
}
//export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }