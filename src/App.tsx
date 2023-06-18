import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

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

    return (
        <div className="App">
            <Todolist tasks={tasks}
                      deleteTask={deleteTask}
                      addTask={addTask}
                      changeIsDone={changeIsDone}/>
        </div>
    );
}

export default App;
