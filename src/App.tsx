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
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: "Todo", filter: "active"},
        {id: todoListId2, title: "Completed", filter: "completed"}
    ])
    let [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}]
    });

    const [filter, setFilter] = useState('all');


    function changeIsDone(id: string, newIsDone: boolean) {
        setTasks(tasks.map(task => task.id === id ? {...task, isDone: newIsDone} : task)) // map tut sozdaet novyj massiv. po4emu tipizacija ne srabatyvaet?
    }

    function deleteTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function addTask(title: string) {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let filteredTasks = tasks[tl.id]
                if (filter === 'all') setTasks(filteredTasks)
                if (filter === 'completed'){
                    tasks[tl.id] = filteredTasks.filter(task => task.isDone)
                    setTasks(tasks)
                }
                //TODO: missing filter === 'active'

                return <Todolist tasks={tasks}
                                 deleteTask={deleteTask}
                                 addTask={addTask}
                                 changeIsDone={changeIsDone}/>
            })}
        </div>
    );
}

export default App;
