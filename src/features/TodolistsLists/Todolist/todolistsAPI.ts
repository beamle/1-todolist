import axios from "axios";
import { instance } from "../../../api";


//apis
export const todolistsAPI = {
    getTodolists() {
        let promise = instance.get<Array<TodolistType>>("todo-lists") // here typization shows what we return
        return promise;
    },
    createTodolist(title: string) {
        return instance.post<TodolistResponseType<ItemType>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<TodolistResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
}

// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type ItemType = {
    item: TodolistType
}
type TodolistResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
