import React from 'react'
import {Provider} from 'react-redux';
import {AppRootStateType} from "../app/store";
import {todolistsReducer} from "../features/TodolistsLists/Todolist/reducers/todolists-reducer";
import {tasksReducer} from "../features/TodolistsLists/Todolist/Task/reducers/tasks-reducer";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, legacy_createStore, legacy_createStore as createStore} from "redux";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {TaskPriorities, TaskStatuses} from '../features/TodolistsLists/Todolist/Task/tasksAPI';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS",
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
                id: v1(), title: "Milk",
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
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    login: {
        isLoggedIn: false,
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}