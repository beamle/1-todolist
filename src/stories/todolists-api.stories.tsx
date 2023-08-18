import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {tasksApi, todolistsApi, TodolistType} from "../api/todolists-api";

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[]>([])
    useEffect(() => {
        todolistsApi.getTodolists() // returns promise
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
        todolistsApi.createTodolist("supertodolist2")
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
        todolistsApi.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "e178122d-105c-47aa-9065-cf4372c4edfb"
        todolistsApi.updateTodolist(todolistId, "HEEEELOOOOOOOO")
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
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "64087823-589e-40b3-b8ec-e721c89bcc9c"
        tasksApi.createTask(todolistId)
            .then(res => setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "64087823-589e-40b3-b8ec-e721c89bcc9c"
        const taskId = "e7d14355-e080-40e1-8690-b98566dca3a8"
        tasksApi.deleteTasks(todolistId, taskId)
            .then(res => setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = "64087823-589e-40b3-b8ec-e721c89bcc9c"
        const taskId = "16844227-27df-47d2-8732-4de4635ac372"
        tasksApi.updateTasks(todolistId, taskId)
            .then(res => setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}
