import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./features/TodolistsLists/Todolist/Task/reducers/tasks-reducer";
import { todolistsReducer } from "./features/TodolistsLists/Todolist/reducers/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "./app/app-reducer";

// type RootState = {
//     todolists: TodoListType[]
//     tasls: TasksType[]
// }

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// @ts-ignore
window.store = store;