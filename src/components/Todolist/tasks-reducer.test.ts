import {v1} from "uuid";
import {useState} from "react";
import {TasksType} from "../../App";
import {
    AddTaskAC,
    AddTaskType,
    ChangeTaskIsDoneType, ChangeTaskStatusAC, ChangeTaskTitle, ChangeTaskTitleAC,
    DeleteTaskAC,
    DeleteTaskActionType,
    tasksReducer
} from "./tasks-reducer";
import {AddTask} from "@mui/icons-material";
import todolist from "./Todolist";

let todoListId1 = v1();
let todoListId2 = v1();

const startState = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}],
    [todoListId2]: [
        {id: v1(), title: "Angular", isDone: false},
        {id: v1(), title: "Java", isDone: false}
    ]};


test("task should be deleted from tasks array", () => {
    const action:DeleteTaskActionType = DeleteTaskAC(startState[todoListId1][0].id, todoListId1)

    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId2].length).toBe(2)
    expect(endState[todoListId1][0].title).toBe("JS")

})

test("tasks isDone status should be changed", () => {
    const action: ChangeTaskIsDoneType = ChangeTaskStatusAC(todoListId1, startState[todoListId1][2].id, true)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][2].isDone).toBe(true)
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
    const action: AddTaskType = AddTaskAC(todoListId2, title)
    // const action: AddTaskType = {type: "ADD-TASK", todolistId: todoListId2, title}
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2][2].title).toBe(title)
})

test("change task title", () => {
    const title = "changedTitle"
    const action: ChangeTaskTitle = ChangeTaskTitleAC(todoListId1, startState[todoListId1][0].id, title)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][0].title).toBe(title)
})