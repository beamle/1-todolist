import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../store";


type TasksType = {
    [key: string]: TaskType[]
}

export type DeleteTaskActionType = {
    type: "DELETE-TASK"
    id: string
    todolistId: string
}
export type UpdateTaskType = {
    type: "UPDATE-TASK"
    todolistId: string
    id: string
    model: UpdateDomainTaskModelType
}
export type AddTaskType = {
    type: "ADD-TASK"
    task: TaskType
}
// export  type ChangeTaskTitle = {
//     type: "CHANGE-TITLE"
//     todolistId: string
//     id: string
//     title: string
// }
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

type ActionsType = DeleteTaskActionType | UpdateTaskType | AddTaskType |
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
        case "UPDATE-TASK":
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.id
                    ? {...task, ...action.model}
                    : task)
            }
        case "ADD-TASK":
            const newTask = action.task
            return {
                ...state,
                [newTask.todoListId]: [...state[newTask.todoListId], newTask]
            }
        // case "CHANGE-TITLE":
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map(task => task.id === action.id ? {
        //             ...task,
        //             title: action.title
        //         } : task)
        //     }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolist.id]: []
            }
        case "REMOVE-TODOLIST":
            //{ type: 'REMOVE-TODOLIST', todoListId}
            let newState = {...state};
            for (const key in state) {
                if (key === action.todolistId) {
                    delete newState[key]
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

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): UpdateTaskType => {
    return {type: "UPDATE-TASK", todolistId, id: taskId, model}
}

export const addTaskAC = (task: TaskType): AddTaskType => {
    return {type: "ADD-TASK", task}
}

// export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitle => {
//     return {type: "CHANGE-TITLE", todolistId, id, title}
// }
export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
    }
}
export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(res => dispatch(deleteTaskAC(taskId, todolistId)))
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksApi.createTask(todolistId, title)
            .then(res => dispatch(addTaskAC(res.data.data.item))
            )
    }
}


type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTH = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            throw new Error("Task wasn't found in the state")
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => dispatch(updateTaskAC(todolistId, taskId, domainModel)))
    }
}