import {AnyAction, combineReducers, Dispatch} from "redux";
import {tasksReducer} from "../features/TodolistsLists/Todolist/Task/reducers/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsLists/Todolist/reducers/todolists-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {loginReducer} from "../features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";

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

export type AsyncThunkConfigType<RejValue = unknown> = {
    state: AppRootStateType
    dispatch?: Dispatch
    extra?: unknown
    rejectValue?: RejValue
    serializedErrorType?: unknown
    pendingMeta?: unknown
    fulfilledMeta?: unknown
    rejectedMeta?: unknown
}

type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// @ts-ignore
window.store = store;