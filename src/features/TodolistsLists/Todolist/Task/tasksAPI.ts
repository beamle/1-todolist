import { instance } from "../../../../api"
import {FieldsErrors} from "../../../../common/types/common-types";


export const tasksApi = {
    getTasks(todolistId: string){
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<TaskResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string, taskId:string){
        return instance.delete<TaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId:string, model: UpdateTaskModelType) {
        return instance.put<TaskResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
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
export type TaskResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors?: FieldsErrors
    resultCode?: number
}
type DeleteTaskResponseType = {
    resultCode: number
    messages: string
    data: {}
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
