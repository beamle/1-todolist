import React, {useEffect, useState} from 'react'
import {TaskPriorities, tasksApi, TaskStatuses, UpdateTaskModelType } from '../features/TodolistsLists/Todolist/Task/tasksAPI';
import {
    todolistsAPI,
    TodolistType,
} from "../features/TodolistsLists/Todolist/todolistsAPI";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([])
    useEffect(() => {
        todolistsAPI.getTodolists() // returns promise
            .then(res => setState(res.data))
            .catch(err => console.log(err
            ))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("supertodolist2")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "0a35a26e-7616-4b89-b5dc-d54d2bd2dd66"
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "e178122d-105c-47aa-9065-cf4372c4edfb"
        todolistsAPI.updateTodolist(todolistId, "HEEEELOOOOOOOO")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "64087823-589e-40b3-b8ec-e721c89bcc9c"
        tasksApi.getTasks(todolistId)
            .then(res => setState(res.data.items))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<any>(null);
    const createTask = () => {
        tasksApi.createTask(todolistId, "hello")
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistID"} value={todolistId} onChange={(event) => setTodolistId(event.target.value)}/>
        <button onClick={createTask}>Create task</button></div>
}

export const DeleteTasksssssss = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('');
    const [taskId, setTaskId] = useState('');

    const deleteTask = () => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistID"} value={todolistId} onChange={(event) => setTodolistId(event.target.value)}/>
            <input placeholder={"taskID"} value={taskId} onChange={(event) => setTaskId(event.target.value)}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState('');
    const [taskId, setTaskId] = useState('');

    const updateTask = () => {
        const model: UpdateTaskModelType = {
            title: '',
            description: '',
            status: TaskStatuses.InProgress,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
        }
        tasksApi.updateTask(todolistId, taskId, model)
            .then(res => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <input placeholder={"todolistID"} value={todolistId} onChange={(event) => setTodolistId(event.target.value)}/>
        <input placeholder={"taskID"} value={taskId} onChange={(event) => setTaskId(event.target.value)}/>
        <button onClick={updateTask}>Update task</button>
    </div>
}
