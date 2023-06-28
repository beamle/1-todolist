import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string] : TaskType[]
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "Todo", filter: "active"},
        {id: todoListId2, title: "Finished", filter: "completed"}
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Angular", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ],
    });

    // TASKS MANIPULATION
    function changeIsDone(id: string, newIsDone: boolean, todoListId: string) {
        let tasksArr = tasks[todoListId]
        debugger
        tasks[todoListId] = tasksArr.map(task => task.id === id ? {...task, isDone: newIsDone} : task)
        console.log(tasks)
        setTasks({...tasks})

        //     let task = tasksArr.find(t => t.id === id)
        //     if (task) {
        //         task.isDone = newIsDone;
        //         setTasks({...tasks})
        //     }
        // } // МУТАЦИЯ
    }
    function deleteTask(id: string, todoListId: string) {
        let tasksArr = tasks[todoListId]
        let filteredTasks = tasksArr.filter(task => task.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }
    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasksArr = tasks[todoListId];
        tasks[todoListId] = [...tasksArr, newTask]
        setTasks({...tasks})
    }
    const allFiltersHandler = (filter: FilterValuesType, todoListId: string) => {
        let todoListToChange = todoLists.find(td => td.id === todoListId)
        if (todoListToChange) todoListToChange.filter = filter
        setTodoLists([...todoLists])
    }
    const changeTaskTitleHandler = (taskId: string, newTitle: string, todoListId: string) => {
        let newTasks = {...tasks}
        let taskToChange = newTasks[todoListId].find((task: TaskType) => task.id === taskId)
        if (taskToChange) {
            taskToChange.title = newTitle
            setTasks(newTasks)
        }

            // let updatedTasksList = tasks[todoListId].map(task => taskId === task.id ? {...task, title: newTitle} : task)

        // let taskToUpdate = tasks[todoListId].find(task => taskId === task.id)
        // if (taskToUpdate) {
        //     taskToUpdate.title = newTitle
        //     setTasks({...tasks} )
        // } // МУТАЦИЯ
    }

    // TODOLISTS MANIPULATION
    const deleteTodoList = (id: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== id))
        delete tasks[id]
        setTasks(tasks)
    }
    function addTodolist(title: string) {
        let todolist: TodoListType =  {id: v1(), title: title, filter: "all"}
        setTodoLists([...todoLists, todolist])
        setTasks({...tasks, [todolist.id] : []})
    }
    const changeTodolistTitleHandler = (title:string, todolistId: string ) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }
    console.log(todoLists)

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id]

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }

                return <Todolist key={tl.id}
                                 id={tl.id}
                                 tasks={tasksForTodolist}
                                 title={tl.title}
                                 deleteTask={deleteTask}
                                 addTask={addTask}
                                 changeIsDone={changeIsDone}
                                 changeTaskTitleHandler={changeTaskTitleHandler}
                                 allFiltersHandler={allFiltersHandler}
                                 filter={tl.filter}
                                 deleteTodoList={deleteTodoList}
                                 changeTodolistTitleHandler={changeTodolistTitleHandler}
                />
            })}
        </div>
    );
}

export default App;
