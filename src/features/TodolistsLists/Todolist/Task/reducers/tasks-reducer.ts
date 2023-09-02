import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "../../reducers/todolists-reducer";
import {
    RESULT_CODE,
    TaskPriorities,
    tasksApi,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../../../../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../../store";
import {
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../../utils/error-utitls";
import axios, {AxiosError} from "axios";

const initialState: TasksType = {};

export const tasksReducer = (state: TasksType = initialState, action: TaskActionsType): TasksType => {
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
        case "ADD-TODOLIST":
            return {
                ...state, [action.todolist.id]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state};
            delete newState[action.todolistId]
            return newState
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}


// action creators
export const deleteTaskAC = (id: string, todolistId: string) =>
    ({type: "DELETE-TASK", id, todolistId} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: "UPDATE-TASK", todolistId, id: taskId, model} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: "SET-TASKS", tasks, todolistId} as const)


// thunk creator
export const fetchTasksTC = (todolistId: string) => (dispatch: TaskThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: TaskThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(deleteTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: TaskThunkDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    // since try/catch could work with syncronous code as well we have to add check
    // axios.isAxiosError to allow axios control did axios generate this error or not.
    // coz if not, the it's probably sync code.
    try {
        const res = await tasksApi.createTask(todolistId, title)
        if (res.data.resultCode === RESULT_CODE.Success) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        if(axios.isAxiosError(err)) { // if axios generated -> returns true
            handleServerNetworkError(err, dispatch)
        }
    }
}

export const updateTaskTH = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: TaskThunkDispatchType, getState: () => AppRootStateType) => {
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
        dispatch(setAppStatusAC('loading'))
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(err, dispatch)
            })
    }

// types
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksType = {
    [key: string]: TaskType[]
}
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
export type UpdateTaskType = ReturnType<typeof updateTaskAC>
export type AddTaskType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type TaskThunkDispatchType = Dispatch<TaskActionsType | SetAppStatusActionType | SetAppErrorActionType>

type TaskActionsType = DeleteTaskActionType | UpdateTaskType | AddTaskType |
    AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType


