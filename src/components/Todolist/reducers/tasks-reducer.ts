import {v1} from "uuid";
import todolist from "../Todolist";
import {
    AddTodolistActionType,
    removeTodolistAC,
    RemoveTodolistActionType,
    todoListId1,
    todoListId2
} from "./todolists-reducer";
import {useReducer} from "react";

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

type ActionsType = DeleteTaskActionType | ChangeTaskIsDoneType | AddTaskType | ChangeTaskTitle |
                   AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    console.log('in tasks')
    switch (action.type) {
        case "DELETE-TASK":
            let todolist = action.todolistId
            return {...state,
                [action.todolistId]: state[todolist].filter(task => task.id !== action.id)}
        case "CHANGE-TASK-ISDONE":
            return {...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.id
                    ? {...task, isDone: action.isDone}
                    : task)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], {id: v1(), title: action.title, isDone: false}]
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.id ? {...task, title: action.title}: task)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            //{ type: 'REMOVE-TODOLIST', todolistId}
            let newState = {...state};
            for (const key in state) {
                if (key === action.todolistId) {
                    console.log(newState, "newState[key]")
                    console.log(action.todolistId, "action.todolistId")
                    delete newState[key]
                    console.log(newState, "newState after delete")
                    debugger
                    break
                }
            }
            return newState
        default:
            return state
    }
}

export const deleteTaskAC = (id: string, todolistId: string): DeleteTaskActionType => {
    return {type: "DELETE-TASK", id, todolistId}
}

export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean): ChangeTaskIsDoneType => {
    return {type: "CHANGE-TASK-ISDONE", todolistId, id, isDone}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: "ADD-TASK", todolistId, title}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitle => {
    return {type: "CHANGE-TITLE", todolistId, id, title}
}