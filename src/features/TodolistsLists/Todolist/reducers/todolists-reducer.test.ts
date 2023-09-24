import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistEntityStatusAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";


let todolistId1 = v1()
let todolistId2 = v1()

const startState: TodolistDomainType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
    {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'}
]

test('correct todolist should be remover', () => {

    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})
    const endState = todolistsReducer(startState, removeTodolistAC({todolistId: todolistId1}))



    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test("add new todolist", () => {

    const newTitle = "new todolist"

    // const action = {type: 'ADD-TODOLIST', title: newTitle}

    const endState = todolistsReducer(startState, addTodolistAC({todolist: {id: v1(), title: newTitle, addedDate: '', order: 0} }))

    expect(endState.length).toBe(3)
    expect(endState[0].title ).toBe(newTitle)
    // expect(endState[2].filter ).toBe('all')

})

test("todolist's title should be changed", () => {

    const newTitle = "changed Title"

    // const action: ChangeTodolistTitleActionType = {type: 'CHANGE-TITLE', id: todolistId1, title: newTitle} // DIFFERENT WAYS TO ADD TYPIZATION

    const endState = todolistsReducer(startState, changeTodolistTitleAC({title: newTitle, todolistId: todolistId1}))

    expect(endState[0].title).toBe(newTitle)
    expect(endState.length).toBe(2)
})

test("todolist's filter should be changed", () => {

    const newFilter = "active"


    // const action: ChangeTodolistFilterActionType = {type: 'CHANGE-FILTER', id: todolistId1, filter: "active"}
    const action = changeTodolistFilterAC({todoListId: todolistId1, filter: newFilter})

    const endState: TodolistDomainType[] = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('active')

})

test('todolists should be set to the state', () => {

    const action = setTodolistsAC({todolists: startState})
    const endState = todolistsReducer([], action)
    console.log(endState)

    expect(endState.length).toBe(2)
})

test('todolist entity status should be changed', () => {
    const action = setTodolistEntityStatusAC({todolistId: todolistId2, status: 'loading'})
    const endState = todolistsReducer(startState, action)
    console.log(endState)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe('loading')
})