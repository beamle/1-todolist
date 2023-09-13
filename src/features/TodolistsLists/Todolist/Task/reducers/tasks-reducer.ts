import {
    addTodolistAC,
    AddTodolistActionType, removeTodolistAC,
    RemoveTodolistActionType, setTodolistsAC,
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
import {setAppStatusAC} from "../../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../../utils/error-utitls";
import axios, {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksType = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const taskIndex = tasks.findIndex(t => t.id === action.payload.id)
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1)
            }
        },
        updateTaskAC(state, action: PayloadAction<{ id: string, todolistId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const taskIndex = tasks.findIndex(t => t.id === action.payload.id)
            tasks[taskIndex] = {...tasks[taskIndex], ...action.payload.model}
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
            // let tasks = state[action.payload.todolistId]
            // tasks = action.payload.tasks
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                        state[tl.id] = [];
                    })
        })

        // [removeTodolistAC.type]:
        //     let newState = {...state};
        //     delete newState[action.payload.todolistId]
        //     return newState
        // [setTodolistsAC.type]: {
        //     const copyState = {...state}
        //     action.payload.todolists.forEach(tl => {
        //         copyState[tl.id] = [];
        //     })
        //     return copyState
        // }
    }
})

export const tasksReducer = slice.reducer
export const {deleteTaskAC, updateTaskAC, addTaskAC, setTasksAC} = slice.actions

// export const tasksReducer = (state: TasksType = initialState, action: TaskActionsType): TasksType => {
//     switch (action.type) {
//         case "DELETE-TASK":
//             let todolist = action.todolistId
//             return {
//                 ...state,
//                 [action.todolistId]: state[todolist].filter(task => task.id !== action.id)
//             }
//         case "UPDATE-TASK":
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.id
//                     ? {...task, ...action.model}
//                     : task)
//             }
//         case "ADD-TASK":
//             const newTask = action.task
//             return {
//                 ...state,
//                 [newTask.todoListId]: [...state[newTask.todoListId], newTask]
//             }
//         case addTodolistAC.type:
//             return {
//                 ...state, [action.payload.todolist.id]: []
//             }
//         case removeTodolistAC.type:
//             let newState = {...state};
//             delete newState[action.payload.todolistId]
//             return newState
//         case setTodolistsAC.type: {
//             const copyState = {...state}
//             action.payload.todolists.forEach(tl => {
//                 copyState[tl.id] = [];
//             })
//             return copyState
//         }
//         case "SET-TASKS": {
//             return {...state, [action.todolistId]: action.tasks}
//         }
//         // case "SET-TASK-ENTITY-STATUS": {
//         //     return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
//         // }
//         default:
//             return state
//     }
// }


// action creators
// export const deleteTaskAC = (id: string, todolistId: string) =>
//     ({type: "DELETE-TASK", id, todolistId} as const)
// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
//     ({type: "UPDATE-TASK", todolistId, id: taskId, model} as const)
// export const addTaskAC = (task: TaskType) =>
//     ({type: "ADD-TASK", task} as const)
// export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
//     ({type: "SET-TASKS", tasks, todolistId} as const)


// thunk creator
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC({tasks: res.data.items, todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksApi.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(deleteTaskAC({ id: taskId, todolistId} ))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    // since try/catch could work with syncronous code as well we have to add check
    // axios.isAxiosError to allow axios control did axios generate this error or not.
    // coz if not, the it's probably sync code.
    try {
        const res = await tasksApi.createTask(todolistId, title)
        if (res.data.resultCode === RESULT_CODE.Success) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError(err)) { // if axios generated -> returns true
            handleServerNetworkError(err, dispatch)
        }
    }
}

export const updateTaskTH = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        dispatch(setAppStatusAC({status: 'loading'}))
        tasksApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC({ todolistId, id: taskId, model: domainModel}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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

type TaskActionsType = DeleteTaskActionType | UpdateTaskType | AddTaskType |
    AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType


