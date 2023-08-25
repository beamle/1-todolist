import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./components/Todolist/reducers/tasks-reducer";
import { todolistsReducer } from "./components/Todolist/reducers/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

// type RootState = {
//     todolists: TodoListType[]
//     tasls: TasksType[]
// }

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

// @ts-ignore
window.store = store;