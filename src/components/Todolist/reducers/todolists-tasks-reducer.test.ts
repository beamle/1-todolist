import {TasksType, TodoListType} from "../../../App";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {useState} from "react";

test('todolist and tasks arr should be added', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodoListType[] = [];

    const action = addTodolistAC("new todolist", '1111') //todolistId, title, type: ADD-TODOLIST

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
})

test('todolist and tasks arr should be erased', () => {
    let todoListId1: string = v1();
    let todoListId2: string = v1();

    const startTodolistsState: TodoListType[] = [
        {id: todoListId1, title: "Todo", filter: "active"},
        {id: todoListId2, title: "Finished", filter: "completed"}
    ];

    const startTasksState: TasksType = {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Angular", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ],
    };

    const action = removeTodolistAC(todoListId1)
    debugger
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