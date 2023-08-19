import {v1} from "uuid";
import {useState} from "react";
import {TasksType} from "../../App/App";
import {
    addTaskAC,
    AddTaskType,
    ChangeTaskIsDoneType, changeTaskStatusAC, ChangeTaskTitle, changeTaskTitleAC,
    deleteTaskAC,
    DeleteTaskActionType,
    tasksReducer
} from "./tasks-reducer";
import {AddTask} from "@mui/icons-material";
import {addTodolistAC, AddTodolistActionType} from "./todolists-reducer";

let todoListId1 = v1();
let todoListId2 = v1();

const startState = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false}],
    [todoListId2]: [
        {id: v1(), title: "Angular", isDone: false},
        {id: v1(), title: "Java", isDone: false}
    ]};


test("task should be deleted from tasks array", () => {
    const action:DeleteTaskActionType = deleteTaskAC(startState[todoListId1][0].id, todoListId1)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId2].length).toBe(2)
    expect(endState[todoListId1][0].title).toBe("JS")
    expect(endState[todoListId1].every(t => t.title !== "HTML&CSS")).toBeTruthy();

})

test("tasks isDone status should be changed", () => {
    const action: ChangeTaskIsDoneType = changeTaskStatusAC(todoListId1, startState[todoListId1][1].id, true)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][1].isDone).toBeTruthy()
    expect(endState[todoListId2][1].isDone).toBeFalsy()
    expect(endState[todoListId1].length).toBe(3)
})

test("add new task", () => {
    // const titles = [
    //     "newTask",
    //     "newTas11212121212121212k",
    //     "newTojf0sdu03fjs0uid-fi23-04i90ask",
    //     "????!!!!?!?@$%$^%*&(newTask"
    // ]

    // let currentStatus;
    // const endState = titles.map(title => {
    // const action: AddTaskType = {type: "ADD-TASK", todolistId: todoListId2, title}
    //     currentStatus = tasksReducer(startState, action)
    //     return currentStatus
    // })

    const title = "newTitle"
    const action: AddTaskType = addTaskAC(todoListId2, title)
    // const action: AddTaskType = {type: "ADD-TASK", todolistId: todoListId2, title}
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2][2]).toBeDefined();
    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2][2].title).toBe(title)
    expect(endState[todoListId2][2].isDone).toBe(false)
})

test("change task title", () => {
    const title = "changedTitle"
    const action: ChangeTaskTitle = changeTaskTitleAC(todoListId1, startState[todoListId1][0].id, title)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][0].title).toBe(title)
    expect(endState[todoListId2][0].title).toBe("Angular")
})

test('new array of tasks should be added when new todolist is added', () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState = {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Angular", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ]};

    const action: AddTodolistActionType = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])
})