import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType} from "../store";
import {todolistsReducer} from "../components/Todolist/reducers/todolists-reducer";
import {tasksReducer} from "../components/Todolist/reducers/tasks-reducer";
import {v1} from "uuid";
import {combineReducers, legacy_createStore, legacy_createStore as createStore} from "redux";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", completed: true,
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", completed: false,
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}