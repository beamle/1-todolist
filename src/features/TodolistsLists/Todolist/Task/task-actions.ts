
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../../../app/app-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "./tasksAPI";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../../../common/utils/error-utitls";
import {AppAsyncThunkConfigType, AppRootStateType} from "../../../../app/store";
import {FieldsErrors} from "../../../../common/types/common-types";
import {RESULT_CODE} from "../../../../common/enums";


// thunk creators
//<{tasks: TaskType[], todolistId: string}, string>
export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks", async (todolistId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(setAppStatusAC({status: 'loading'}))
    let res = await tasksApi.getTasks(todolistId)
    try {
        // dispatch(setTasksAC({tasks: res.data.items, todolistId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId}
    } catch (err: any) {
        const error: AxiosError = err;
        handleServerNetworkError(error, dispatch)
    }
})
export const deleteTaskTC = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, AppAsyncThunkConfigType<{ error: string[], fieldsErrors: FieldsErrors }>>("tasks/deleteTaskTC", async (args, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await tasksApi.deleteTask(args.todolistId, args.taskId);
        try {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolistId: args.todolistId, taskId: args.taskId}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({error: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err: any) {
            const error: AxiosError = err;
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({error: [error.message], fieldsErrors: undefined})
        }
    })
export const addTaskTC = createAsyncThunk<{ task: TaskType }, { todolistId: string, title: string }>("tasks/addTaskTC", async ({todolistId, title}, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(setAppStatusAC({status: 'loading'}))
        // since try/catch could work with syncronous code as well we have to add check
        // axios.isAxiosError to allow axios control did axios generate this error or not.
        // coz if not, the it's probably sync code.
        const res = await tasksApi.createTask(todolistId, title)
        try {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue({error: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err: any) {
            // if (axios.isAxiosError(err)) { // if axios generated -> returns true
            const error: AxiosError = err;
            handleServerNetworkError(error, dispatch)
            return rejectWithValue({error: [error.message], fieldsErrors: undefined})
        }
    })
export const updateTaskTC = createAsyncThunk("tasks/updateTask", async (args: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {dispatch, rejectWithValue, getState}) => {
        const state = getState() as AppRootStateType;
        const {todolistId, taskId, domainModel} = args;
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return rejectWithValue("Task wasn't found in the state")
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
        const res = await tasksApi.updateTask(todolistId, taskId, apiModel)
        try {
            if (res.data.resultCode === RESULT_CODE.Success) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todolistId, id: taskId, model: domainModel}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }

        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        }
    })

// types
type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}