import {useState} from "react";
import {todoListId1, todoListId2} from "../id-utils";
import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType} from "../../../features/TodolistsList/Todolist/reducers/todolists-reducer";

export function useTodolists(onTodolistRemove: (todolistId: string) => void,
                             addEmptyTasksArr: (todolistId: string) => void)
{
    let [todoLists, setTodoLists] = useState<TodolistDomainType[]>([
        {id: todoListId1, title: "Todo", addedDate: '', order: 0, filter: "active"},
        {id: todoListId1, title: "Todo", addedDate: '', order: 1, filter: "completed"}
    ])

    // TODOLISTS MANIPULATION
    const deleteTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        onTodolistRemove(id)
    }

    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {id: v1(), title: title, addedDate: "", order: 0, filter: "all"}
        setTodoLists([...todoLists, todolist])
        addEmptyTasksArr(todolist.id)
    }

    const changeTodolistTitleHandler = (title: string, todolistId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const allFiltersHandler = (filter: FilterValuesType, todoListId: string) => {
        let todoListToChange = todoLists.find(td => td.id === todoListId)
        if (todoListToChange) todoListToChange.filter = filter
        setTodoLists([...todoLists])
        // setTodoLists(todoLists.map(ts => ts.id === todoListId ? {...ts, filter} : ts))
    }

    return {
        todoLists,
        setTodoLists,
        deleteTodoList,
        addTodolist,
        changeTodolistTitleHandler,
        allFiltersHandler
    }

}
