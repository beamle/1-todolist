import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {MyButton} from "../../../common/components/Button/Button";
import Button from "@material-ui/core/Button";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {AppRootStateType, useAppDispatch} from "../../../app/store";
import {FilterValuesType, TodolistDomainType} from "./reducers/todolists-reducer";
import {TaskStatuses, TaskType} from './Task/tasksAPI';
import {addTaskTC, fetchTasksTC} from "./Task/task-actions";

type PropsType = {
    todolist: TodolistDomainType
    changeTodolistTitleHandler: (title: string, todolistId: string) => void
    allFiltersHandler: (todoListId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    deleteTodoList: (id: string) => void
    addTodoList?: () => void
    demo?: boolean
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist rendered')
    const {todolist, filter, allFiltersHandler, deleteTodoList, changeTodolistTitleHandler, demo = false} = props
    const dispatch = useAppDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])

    useEffect(() => {
        if (demo) return
            dispatch(fetchTasksTC(todolist.id))
    },[])

    const addNewTask = useCallback((title: string) => {
        dispatch(addTaskTC({todolistId: todolist.id, title}))
    }, [todolist.id, todolist.title])

    const changeTodolistTitle = useCallback((title: string) => changeTodolistTitleHandler(title, todolist.id), [])

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
    }

    const deleteTodolistHandler = () => {
        deleteTodoList(todolist.id)
    }


    function showTasks() {
        return tasksForTodolist.map(task => {
                return (
                    // <li key={task.id} className={task.isDone ? s.isDone : ''}
                    //     style={{width: '100%', display: 'flex', alignItems: 'center', listStyleType: 'none'}}>
                    // </li>
                    <Task key={task.id} task={task} todolistId={todolist.id}/>
                )
            }
        )
    }


    return (
        <Box sx={{mt: 3, mr: 1, ml: 1}}>
            <div>
                <Button onClick={deleteTodolistHandler} disabled={todolist.entityStatus === 'loading'}>X</Button>
                <EditableSpan title={todolist.title} changeTitleHandler={changeTodolistTitle} disabled={todolist.entityStatus === 'loading'}/>
            </div>
            <div>
                <AddItemForm addItem={addNewTask} todolistStatus={todolist.entityStatus}/>
                <ul style={{padding: 0}}>{showTasks()}</ul>
            </div>
            <div>
                <MyButton className={filter === 'all' ? 'contained' : 'outlined'} name={'all'}
                          callBack={() => allFiltersHandler(todolist.id, 'all')}/>
                <MyButton className={filter === 'active' ? 'contained' : 'outlined'} name={'active'}
                          callBack={() => allFiltersHandler(todolist.id, 'active')}/>
                <MyButton className={filter === 'completed' ? 'contained' : 'outlined'} name={'completed'}
                          callBack={() => allFiltersHandler(todolist.id, 'completed')}/>
            </div>
        </Box>
    );
});