import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "../../reducers/todolists-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../../../../../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../../store";
import {setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType} from "../../../../../app/app-reducer";

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
    dispatch(setStatusAC('loading'))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TaskActionsType>) => {
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => dispatch(deleteTaskAC(taskId, todolistId)))
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TaskActionsType | SetErrorActionType | SetStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    tasksApi.createTask(todolistId, title)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    console.log(res)
                    if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    }
                    else {
                        dispatch(setErrorAC("Something went wrong! Try again"))
                    }
                    dispatch(setStatusAC('failed'))
                }
            }
        )
}
export const updateTaskTH = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<TaskActionsType | SetStatusActionType>, getState: () => AppRootStateType) => {
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
        dispatch(setStatusAC('loading'))
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
                dispatch(setStatusAC('succeeded'))
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

type TaskThunkDispatchType =  Dispatch<TaskActionsType | SetStatusActionType>

type TaskActionsType = DeleteTaskActionType | UpdateTaskType | AddTaskType |
    AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType