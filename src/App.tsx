import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TodoList, {TaskType} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {
    // BLL:
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId_1, title: "What to learn", filter: "all" },
        { id: todoListId_2, title: "What to buy", filter: "all" },
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS/TS", isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: "Ice cream", isDone: true },
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Water", isDone: false },
        ]
    })

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? { ...tl, filter: nextFilterValue } : tl)
        setTodoLists(updatedTodoLists)
    }
    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        // const tasksForTodoList: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const updatedTasks: Array<TaskType> = [newTask,...tasksForTodoList]
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        //
        setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] })
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? { ...t, isDone: newIsDoneValue }
                : t)
        })
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? { ...t, title: newTitle }
                : t)
        })
    }
    const changeTodoListTitle = (newTodoListTitle: string, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? { ...tl, title: newTodoListTitle } : tl)
        setTodoLists(updatedTodoLists)
    }


    const removeTodoList = (todoListId: string) => {
        const updatedTodoLists: Array<TodoListType> = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(updatedTodoLists)
        const copyTasks = { ...tasks }
        delete copyTasks[todoListId]
        setTasks(copyTasks)
    }

    const addTodoList = (title: string) => {
        const newTodoId = v1()
        const newTodo: TodoListType = {
            id: newTodoId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({ ...tasks, [newTodoId]: [] })
    }

    // UI
    const maxTodoListTitleLength = 15
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }

    const todoListsComponents: Array<JSX.Element> = todoLists.map((tl) => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })


    console.log(tasks)



    return (
        <div className="App">
            <AddItemForm maxTaskTitleLength={maxTodoListTitleLength} addItem={addTodoList} />
            {todoListsComponents}
        </div>
    );
}

export default App;
