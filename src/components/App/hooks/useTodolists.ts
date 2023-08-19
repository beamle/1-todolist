import {useState} from "react";
import {FilterValuesType, TodoListType} from "../App";
import {todoListId1, todoListId2} from "../id-utils";
import {v1} from "uuid";

export function useTodolists(onTodolistRemove: (todolistId: string) => void,
                             addEmptyTasksArr: (todolistId: string) => void)
{
    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "Todo", filter: "active"},
        {id: todoListId2, title: "Finished", filter: "completed"}
    ])

    // TODOLISTS MANIPULATION
    const deleteTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        onTodolistRemove(id)
    }

    function addTodolist(title: string) {
        let todolist: TodoListType = {id: v1(), title: title, filter: "all"}
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
