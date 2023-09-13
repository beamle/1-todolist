import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./features/TodolistsLists/Todolist/Task/reducers/tasks-reducer";
import { todolistsReducer } from "./features/TodolistsLists/Todolist/reducers/todolists-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app/app-reducer";
import {loginReducer} from "./features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";

// type RootState = {
//     todolists: TodoListType[]
//     tasls: TasksType[]
// }

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer
})
// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// @ts-ignore
window.store = store;