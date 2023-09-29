import {v1} from "uuid";
import {
    addTask,
    deleteTask, fetchTasks,
    tasksReducer, TasksType, updateTask
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses } from "../tasksAPI";
import {createTodolistTC, fetchTodolistTC} from "../../reducers/todolists-reducer";

let todoListId1 = v1();
let todoListId2 = v1();

const startState: TasksType = {
    [todoListId1]: [
        {
            id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description: '', todoListId: todoListId1,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.New, description: '', todoListId: todoListId1,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "ReactJS", status: TaskStatuses.New, description: '', todoListId: todoListId1,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }],
    [todoListId2]: [
        {
            id: v1(), title: "Angular", status: TaskStatuses.New, description: '', todoListId: todoListId2,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "Java", status: TaskStatuses.New, description: '', todoListId: todoListId2,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }
    ]
};

test("task should be deleted from tasks array", () => {
    const action = deleteTask.fulfilled({taskId: startState[todoListId1][0].id, todolistId: todoListId1}, "requestId", {taskId: startState[todoListId1][0].id, todolistId: todoListId1})

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId2].length).toBe(2)
    expect(endState[todoListId1][0].title).toBe("JS")
    expect(endState[todoListId1].every(t => t.title !== "HTML&CSS")).toBeTruthy();

})

test("tasks isDone status should be changed", () => {
    const args = {id: startState[todoListId1][1].id, todolistId: todoListId1, model: {status: TaskStatuses.Completed}}
    const action = updateTask.fulfilled(
        args, "requestId", {taskId: startState[todoListId1][1].id, todolistId: todoListId1, domainModel: {status: TaskStatuses.Completed}})
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][1].status === TaskStatuses.Completed).toBeTruthy()
    expect(endState[todoListId2][1].status === TaskStatuses.Completed).toBeFalsy()
    expect(endState[todoListId1].length).toBe(3)
})

test("add new task", () => {
    const title = "newTitle"
    let task = {
        id: v1(), title: title, status: TaskStatuses.New, description: '', todoListId: todoListId2,
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    }
    const action = addTask.fulfilled({ task}, "requestId", {todolistId: todoListId2, title} )
    // const action: AddTaskType = {type: "ADD-TASK", todoListId: todoListId2, title}
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2][0]).toBeDefined();
    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2][0].title).toBe(title)
    expect(endState[todoListId2][2].status === TaskStatuses.Completed).toBe(false)
})

test("change task title", () => {
    const title = "changedTitle"
    const action = updateTask.fulfilled({
        id: startState[todoListId1][0].id, todolistId: todoListId1, model: {title}}, "requestId", {taskId: startState[todoListId1][0].id, todolistId: todoListId1, domainModel: {title} }
    )
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][0].title).toBe(title)
    expect(endState[todoListId2][0].title).toBe("Angular")
})

test('new array of tasks should be added when new todolist is added', () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState = {
        [todoListId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.New, description: '', todoListId: "2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New, description: '', todoListId: "2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New, description: '', todoListId: "2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }],
        [todoListId2]: [
            {
                id: v1(), title: "Angular", status: TaskStatuses.New, description: '', todoListId: "2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "Java", status: TaskStatuses.New, description: '', todoListId: "2",
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    };

    const action = createTodolistTC.fulfilled({
        todolist: {
            id: v1(),
            title: "action.todolist.title",
            addedDate: '',
            order: 0
        }
    }, "requestId", "action.todolist.title");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})

test('empty array  should be added when new todolist is created', () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    const todolists = [
        {id: todoListId1, title: "title 1", order: 0, addedDate: ''},
        {id: todoListId2, title: "title 2", order: 1, addedDate: ''}
    ]

    const action = fetchTodolistTC.fulfilled({todolists}, "requestId")

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(keys[0]).toBe(todoListId1)
    expect(endState[todoListId1]).toStrictEqual([])
    expect(endState[todoListId2]).toStrictEqual([])
    expect(keys[3]).toBeUndefined()
})

test('tasks should be added to todolist', () => {
    const action = fetchTasks.fulfilled({tasks: startState[todoListId1], todolistId: todoListId1}, "requestId", todoListId1)
        //fulfilled is action creator at this moment
    const endState = tasksReducer({
        todoListId1: [],
        'todoListId2': []
    }, action)


    expect(endState[todoListId1].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(0)


})