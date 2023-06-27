import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TodoList, {TaskType} from "./components/Todolist/Todolist";
import AddItemForm from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function App(): JSX.Element {
    let todoListId_1 = v1();
    let todoListId_2 = v1();

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true}],
        [todoListId_2]: [
            {id: v1(), title: "Banana", isDone: false},
            {id: v1(), title: "Bananaaa", isDone: false},
            {id: v1(), title: "Bananaaaa", isDone: false},
            {id: v1(), title: "Strawberries", isDone: false}],
    })

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "To Learn", filter: "completed"},
        {id: todoListId_2, title: "To buy", filter: "active"},
    ])

    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const filteredTodolist = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl)
        setTodoLists(filteredTodolist)

        // const updatedTodoLists: TodoListType[] = todoLists.map(tl => tl.id === todoListId ? {
        //     ...tl,
        //     filter: nextFilterValue
        // } : tl)
        // setTodoLists(updatedTodoLists)
    }
    const removeTask = (taskId: string, todoListId: string) => {
        const nextState = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todoListId]: nextState})
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)})

        // const tasksForTodoList = tasks[todoListId]
        // const updatedTasks = tasks[todoListId].filter(task => task.id !== taskId)
        // tasks[todoListId] = updatedTasks
        // setTasks({...tasks})

    }
    const addTask = (title: string, todoListId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        let newTasksArr = {...tasks, [todoListId]: [...tasks[todoListId], newTask]}
        setTasks(newTasksArr)

        // setTasks({[todoListId]: [...tasks[todoListId], {id: v1(), title, isDone: false}], ...tasks})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const newTask = tasks[todoListId].map(task => task.id === taskId ? {...task, isDone } : task)
        setTasks({...tasks, [todoListId]: newTask})

        //     setTasks({
        //         ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
        //             ? {...t, isDone: newIsDoneValue}
        //             : t)
        //     })
        // }
    }
    const getFilteredTasks =
        (allTasks: TaskType[], currentFilterValue: FilterValuesType): TaskType[] => {
            switch (currentFilterValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        } // poprobovatj vykinutj v otdelnyj fail "utilities"



    const maxTodolistTitleLength = 10
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        // const updatedTodoLists: TodoListType[] = todoLists.filter(tl => tl.id !== todoListId)
        // setTodoLists(updatedTodoLists)
        // delete tasks[todoListId]
        //         const copyTasks = {...tasks}
        //         delete copyTasks[todoListId]
        //         setTasks(copyTasks)
    }
    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = { id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const newTask = tasks[todoListId].map(task => task.id === taskId ? {...task, newTitle } : task)
        setTasks({...tasks, [todoListId]: newTask})
    }

    const changeTodoListTitle = (newTodoListTitle: string, todoListId: string) => {
        const updatedTodoLists: Array<TodoListType>
            = todoLists.map(tl => tl.id === todoListId ? { ...tl, title: newTodoListTitle } : tl)
        setTodoLists(updatedTodoLists)
    }


    const todoListsComponents: JSX.Element[] = todoLists.map(tl => {
            const filteredTasks: TaskType[] = getFilteredTasks(tasks[tl.id], tl.filter)
            return (
                <TodoList key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          tasks={filteredTasks}
                          addTask={addTask}
                          removeTask={removeTask}
                          removeTodoList={removeTodoList}
                          changeFilter={changeTodoListFilter}
                          changeTaskStatus={changeTaskStatus}
                />
            )}
    )

    return (
        <div className="App">
            <AddItemForm maxItemTitleLength={maxTodolistTitleLength} addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
