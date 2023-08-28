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

//apis
export const todolistsAPI = {
    getTodolists() {
        let promise = instance.get<Array<TodolistType>>("todo-lists") // here typization shows what we return
        return promise;
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<ItemType>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistId: string) {
      return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    },
}

export const tasksApi = {
    getTasks(todolistId: string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<TaskResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string, taskId:string){
        return instance.delete<DeleteTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId:string, model: UpdateTaskModelType) {
        return instance.put<TaskResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
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
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
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
type TaskResponseType<T = {}> = {
    data: T
    totalCount: number
    resultCode?: number
    error: string
}
type DeleteTaskResponseType = {
    resultCode: number
    messages: string
    data: ''
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
