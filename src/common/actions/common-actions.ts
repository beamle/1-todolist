import { createAction } from "@reduxjs/toolkit";
import {TasksType} from "../../features/TodolistsLists/Todolist/Task/reducers/tasks-reducer";
import {TodolistDomainType} from "../../features/TodolistsLists/Todolist/reducers/todolists-reducer";

export type ClearTasksAndTodolistsType = {
    tasks: TasksType
    todolists: TodolistDomainType[]
}

export const clearTasksAndTodolists = createAction('common/clear-tasks-todolists')
