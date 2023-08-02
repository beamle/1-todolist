import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./components/Todolist/reducers/tasks-reducer";
import { todolistsReducer } from "./components/Todolist/reducers/todolists-reducer";

// type RootState = {
//     todolists: TodoListType[]
//     tasls: TasksType[]
// }

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;