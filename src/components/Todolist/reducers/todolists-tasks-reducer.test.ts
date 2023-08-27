import {
    addTodolistAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {useState} from "react";
import {TasksType} from "../../../AppWithRedux";
import {TaskPriorities, TaskStatuses, TodolistType} from "../../../api/todolistsAPI";

test('todolist and tasks arr should be added', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = addTodolistAC({id: v1(), title: "action.todolist.title", addedDate: '', order: 0}) //todoListId, title, type: ADD-TODOLIST

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
})

test('todolist and tasks arr should be erased', () => {
    let todoListId1: string = v1();
    let todoListId2: string = v1();

    const startTodolistsState: TodolistDomainType[] = [
        {
            id: todoListId1,
            title: "HTML/CSS",
            addedDate: "",
            order: 0,
            filter: 'active'
        },
        {
            id: todoListId2,
            title: "NEW",
            addedDate: '',
            order: 0,
            filter: "active"
        }
    ];

    const startTasksState: TasksType = {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS",
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: "JS",
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: "Something",
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low}],
        [todoListId2]: [
            {id: v1(), title: "A",
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: "B",
                status: TaskStatuses.New,
                description: '',
                todoListId: "2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low}
        ],
    };

    const action = removeTodolistAC(todoListId1)
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(Object.keys(endTasksState).length).toBe(1);
    expect(Object.keys(endTasksState)[0]).toBe(idFromTasks);
    expect(endTodolistsState[0].id).toBe(idFromTodolists);
    // expect(endTodolistsState[todoListId1]).not.toBeUndefined();
})