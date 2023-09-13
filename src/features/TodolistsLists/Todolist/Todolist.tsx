import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {MyButton} from "../../../components/Button/Button";
import Button from "@material-ui/core/Button";
import {Box} from "@mui/material";
import {addTaskTC, fetchTasksTC} from "./Task/reducers/tasks-reducer";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {AppRootStateType, useAppDispatch} from "../../../store";
import {FilterValuesType, TodolistDomainType} from "./reducers/todolists-reducer";
import {TaskStatuses, TaskType, TodolistType} from "../../../api/todolistsAPI";
import {RequestStatusType} from "../../../app/app-reducer";

type PropsType = {
    // id: string
    // title: string
    todolist: TodolistDomainType
    changeTodolistTitleHandler: (title: string, todolistId: string) => void
    allFiltersHandler: (todoListId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    deleteTodoList: (id: string) => void
    addTodoList?: () => void
    demo?: boolean
}

// export type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }

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
        dispatch(addTaskTC(todolist.id, title))
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



{/*<button className={filter === 'all' ? s.activeFilter : ''} name={'all'} onClick={() => allFiltersHandler('all')}>All</button>*/
}
{/*<button className={filter === 'active' ? s.activeFilter : ''} name={'active'} onClick={() => allFiltersHandler('active')}>Active</button>*/
}
{/*<button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'} onClick={() => allFiltersHandler('completed')}>Completed</button>*/
}