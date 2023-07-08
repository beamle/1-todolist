import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../../App";
import {
    ActionsType, AddTodolistAC,
    AddTodolistActionType, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType, ChangeTodolistTitleAC,
    ChangeTodolistTitleActionType, RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be remover', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))



    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("add new todolist", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTitle = "new todolist"

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action = {type: 'ADD-TODOLIST', title: newTitle}

    const endState = todolistsReducer(startState, AddTodolistAC(newTitle)) // DIFFERENT WAYS TO ADD TYPIZATION

    expect(endState.length).toBe(3)
    expect(endState[2].title ).toBe(newTitle)
    expect(endState[2].filter ).toBe('all')

})

test("todolist's title should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newTitle = "changed Title"

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ChangeTodolistTitleActionType = {type: 'CHANGE-TITLE', id: todolistId1, title: newTitle} // DIFFERENT WAYS TO ADD TYPIZATION

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId1, newTitle))

    expect(endState[0].title).toBe(newTitle)
    expect(endState.length).toBe(2)
})

test("todolist's filter should be changed", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const newFilter = "active"

    const startState: TodoListType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    // const action: ChangeTodolistFilterActionType = {type: 'CHANGE-FILTER', id: todolistId1, filter: "active"}
    const action = ChangeTodolistFilterAC(todolistId1, newFilter)

    const endState: TodoListType[] = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('active')

})