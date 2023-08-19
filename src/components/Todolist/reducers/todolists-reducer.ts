import {FilterValuesType, TodoListType} from "../../App/App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    todolistId: string
    title: string
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

export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export let todoListId1 = v1()
export let todoListId2 = v1()


const initalState: TodoListType[] = [];

export const todolistsReducer = (state: TodoListType[] = initalState, action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist = {id: action.todolistId, title: action.title, filter: <FilterValuesType> 'all'}
            return [...state, newTodolist]
        case "CHANGE-TD-TITLE":
            return state.map(ts => ts.id === action.todolistId ? {...ts, title: action.title} : ts)
        case "CHANGE-FILTER":
            return state.map(ts => ts.id === action.todolistId ? {...ts, filter: action.filter} : ts)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolistId: v1(), title}
}
export const changeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TD-TITLE', todolistId, title}
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-FILTER', todolistId, filter}
}
//export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }