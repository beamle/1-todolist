import {v1} from "uuid";
import todolist from "./Todolist";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TasksType = {
    [key: string]: TaskType[]
}

export type DeleteTaskActionType = {
    type: "DELETE-TASK"
    id: string
    todolistId: string
}

export type ChangeTaskIsDoneType = {
    type: "CHANGE-TASK-ISDONE"
    todolistId: string
    id: string
    isDone: boolean
}

export type AddTaskType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}

export  type ChangeTaskTitle = {
    type: "CHANGE-TITLE"
    todolistId: string
    id: string
    title: string
}

type ActionsType = DeleteTaskActionType | ChangeTaskIsDoneType | AddTaskType | ChangeTaskTitle

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
    const arrOfTasks = state[action.todolistId]
    switch (action.type) {
        case "DELETE-TASK":
            console.log([action.todolistId])
            return {...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.id)}
        case "CHANGE-TASK-ISDONE":
            return {...state, [action.todolistId]: arrOfTasks.map(task => task.id === action.id
                    ? {...task, isDone: action.isDone}
                    : task)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [...arrOfTasks, {id: v1(), title: action.title, isDone: false}]
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistId]: arrOfTasks.map(task => task.id === action.id ? {...task, title: action.title}: task)
            }
        default:
            throw new Error('Wrong action')
    }
}

export const DeleteTaskAC = (id: string, todolistId: string): DeleteTaskActionType => {
    return {type: "DELETE-TASK", todolistId, id}
}

export const ChangeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeTaskIsDoneType => {
    return {type: "CHANGE-TASK-ISDONE", todolistId, id, isDone}
}

export const AddTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: "ADD-TASK", todolistId, title}
}

export const ChangeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitle => {
    return {type: "CHANGE-TITLE", todolistId, id, title}
}