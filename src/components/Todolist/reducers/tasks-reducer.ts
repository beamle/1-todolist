import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, todolistsAPI} from "../../../api/todolistsAPI";
import { Dispatch } from "redux";


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
    completed: boolean
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
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

type ActionsType = DeleteTaskActionType | ChangeTaskIsDoneType | AddTaskType | ChangeTaskTitle |
    AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case "DELETE-TASK":
            let todolist = action.todolistId
            return {
                ...state,
                [action.todolistId]: state[todolist].filter(task => task.id !== action.id)
            }
        case "CHANGE-TASK-ISDONE":
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.id
                    ? {...task, completed: action.completed}
                    : task)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId],
                    {   id: v1(),
                        title: action.title,
                        status: TaskStatuses.New,
                        todoListId: action.todolistId,
                        description: '',
                        startDate: '',
                        deadline: '',
                        addedDate: '',
                        order: 0,
                        priority: TaskPriorities.Low,
                        completed: false}]
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.id ? {
                    ...task,
                    title: action.title
                } : task)
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
                    delete newState[key]
                    debugger
                    break
                }
            }
            return newState
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case "SET-TASKS": {
            const copyState = {...state}
            console.log(copyState, "before")
            copyState[action.todolistId] = action.tasks
            console.log(copyState, "after")
            return copyState
        }
        default:
            return state
    }
}

export const deleteTaskAC = (id: string, todolistId: string): DeleteTaskActionType => {
    return {type: "DELETE-TASK", id, todolistId}
}

export const changeTaskStatusAC = (todolistId: string, id: string, completed: boolean): ChangeTaskIsDoneType => {
    return {type: "CHANGE-TASK-ISDONE", todolistId, id, completed}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: "ADD-TASK", todolistId, title}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitle => {
    return {type: "CHANGE-TITLE", todolistId, id, title}
}
export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {

    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
    }
}




// type Big = {
//     a: number
//     b: number
// }
// type Small = {
//     a: number
// }
// function bla(obj: Small) {
//     alert(obj.a)
// }
// const bigObj: Big = {a: 12, b: 14}
// bla(bigObj)
// TODO: ETO ZAPISATJ V KONSPEKT