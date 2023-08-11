import React, {useCallback} from 'react';
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {MyButton} from "../Button/Button";
import Button from "@material-ui/core/Button";
import {Box} from "@mui/material";
import {addTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import Task from "../Task/Task";
import {AppRootStateType} from "../../store";

type PropsType = {
    id: string
    title: string
    changeTodolistTitleHandler: (title: string, todolistId: string) => void
    allFiltersHandler: (todoListId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    deleteTodoList: (id: string) => void
    addTodoList?: () => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist rendered')
    const {title, filter, allFiltersHandler, deleteTodoList, id, changeTodolistTitleHandler} = props
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const addNewTask = useCallback((title: string) => {
        const action = addTaskAC(id, title);
        dispatch(action)
    }, [id, title])

    const changeTodolistTitle = useCallback((title: string) => changeTodolistTitleHandler(title, id), [])

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }


    function showTasks() {
        return tasksForTodolist.map(task => {

                return (
                    // <li key={task.id} className={task.isDone ? s.isDone : ''}
                    //     style={{width: '100%', display: 'flex', alignItems: 'center', listStyleType: 'none'}}>
                    // </li>
                    <Task key={task.id} task={task} todolistId={id}/>
                )
            }
        )
    }


    return (
        <Box sx={{mt: 3, mr: 1, ml: 1}}>
            <div>
                <Button onClick={() => deleteTodoList(id)}>X</Button>
                <EditableSpan title={title} changeTitleHandler={changeTodolistTitle}/>
            </div>
            <div>
                <AddItemForm addItem={addNewTask}/>
                <ul style={{padding: 0}}>{showTasks()}</ul>
            </div>
            <div>
                <MyButton className={filter === 'all' ? 'contained' : 'outlined'} name={'all'}
                          callBack={() => allFiltersHandler(id, 'all')}/>
                <MyButton className={filter === 'active' ? 'contained' : 'outlined'} name={'active'}
                          callBack={() => allFiltersHandler(id, 'active')}/>
                <MyButton className={filter === 'completed' ? 'contained' : 'outlined'} name={'completed'}
                          callBack={() => allFiltersHandler(id, 'completed')}/>
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