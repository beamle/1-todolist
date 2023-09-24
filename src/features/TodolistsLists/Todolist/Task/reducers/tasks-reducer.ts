import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../../reducers/todolists-reducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../../../app/store";
import {setAppStatusAC} from "../../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../../common/utils/error-utitls";
import axios, {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../../common/actions/common-actions";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../tasksAPI";
import {RESULT_CODE} from "../../../../../common/enums/enums";

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
        },
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
        });
        // builder.addCase(clearTasksAndTodolists.type, (state, action: PayloadAction<ClearTasksAndTodolistsType>) => {
        //     return action.payload.tasks
        // })
        builder.addCase(clearTasksAndTodolists, (state, action) => {
            return {}
        })
    }
})

export const tasksReducer = slice.reducer
export const {deleteTaskAC, updateTaskAC, addTaskAC, setTasksAC} = slice.actions

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



