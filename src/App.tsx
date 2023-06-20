import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: v1(), title: "Todo", filter: "active"},
        {id: v1(), title: "Finished", filter: "completed"}
    ])

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);

    function changeIsDone(id: string, newIsDone: boolean) {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone: newIsDone} : task)) // map tut sozdaet novyj massiv. po4emu tipizacija ne srabatyvaet?
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function addTask(title: string) {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    const allFiltersHandler = (filter: FilterValuesType, todoListId: string) => {
        let todoListToChange = todoLists.find(td => td.id === todoListId)
        if (todoListToChange) todoListToChange.filter = filter
        setTodoLists([...todoLists])
    }
    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodolist = tasks

                if (tl.filter === 'active') {
                    tasksForTodolist = tasks.filter(task => task.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks.filter(task => !task.isDone)
                }

                return <Todolist key={tl.id}
                                 id={tl.id}
                                 tasks={tasksForTodolist}
                                 title={tl.title}
                                 deleteTask={deleteTask}
                                 addTask={addTask}
                                 changeIsDone={changeIsDone}
                                 allFiltersHandler={allFiltersHandler}
                                 filter={tl.filter}
                />
            })}
        </div>
    );
}

export default App;
