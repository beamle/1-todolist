import {TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksType} from "../Task/reducers/tasks-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../Task/tasksAPI";
import {createTodolistTC, deleteTodolistTC} from "./todolists-reducer";

test('todolist and tasks arr should be added', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = createTodolistTC.fulfilled({todolist: {id: v1(), title: "action.todolist.title", addedDate: '', order: 0}}, "requestId", "title") //todoListId, title, type: ADD-TODOLIST

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
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
            filter: 'active',
            entityStatus: 'idle'
        },
        {
            id: todoListId2,
            title: "NEW",
            addedDate: '',
            order: 0,
            filter: "active",
            entityStatus: 'idle'
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

    const action = deleteTodolistTC.fulfilled({todolistId: todoListId1}, "requestId", todoListId1)
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