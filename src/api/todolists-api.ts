import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "7b095462-668f-44a3-9dd6-fc6dd090e3f3"
    }
}

const instance = axios.create( {
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// type CreateTodolistResponseType = {
//     "data": {
//         "item": TodolistType
//     },
//     "messages": string[],
//     "resultCode": number
// }
//
// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: string[],
//     data: {}
// }
//
// type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[],
//     data: {}
// }

type ItemType = {
    item: TodolistType
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: string
    priority: string
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export const todolistsApi = {
    getTodolists() {
        let promise = instance.get<Array<TodolistType>>("todo-lists") // here typization shows what we return
        return promise;
    },
    createTodolist(title: string) {
        let promise = instance.post<ResponseType<ItemType>>("todo-lists", {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
      return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    }
}