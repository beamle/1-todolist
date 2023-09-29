import {createSlice} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../../../common/actions/common-actions";
import {TaskPriorities, TaskStatuses, TaskType} from "../tasksAPI";
import {addTaskTC, deleteTaskTC, fetchTasksTC, updateTaskTC} from "../task-actions";
import {createTodolistTC, deleteTodolistTC, fetchTodolistTC} from "../../todolist-actions";

const initialState: TasksType = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            debugger
            if (action.payload) {
                state[action.payload.todolistId] = action.payload.tasks
            }
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const taskIndex = tasks.findIndex(t => t.id === action.payload.id)
            tasks[taskIndex] = {...tasks[taskIndex], ...action.payload.model}
        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const taskIndex = tasks.findIndex(t => t.id === action.payload.taskId)
            if (taskIndex > -1) {
                tasks.splice(taskIndex, 1)
            }
        });
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId];
        });
        builder.addCase(fetchTodolistTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = [];
            })
        });
        builder.addCase(clearTasksAndTodolists, (state, action) => {
            return {}
        })
    }
})

export const tasksReducer = slice.reducer


// types
export type TasksType = {
    [key: string]: TaskType[]
}



