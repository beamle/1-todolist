import React from 'react';
import {FilterValuesType} from "../../App";
import s from './Todolist.module.css';
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import Delete from "@material-ui/icons/Delete";
import MyButton from "../Button/Button";
import {IconButton} from "@material-ui/core";
import {MyCheckBox} from "../MyCheckBox/MyCheckBox";
import Button from "@material-ui/core/Button";
import {Box} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store";
import {TasksType} from "../../AppWithRedux";

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

const Todolist = (props: PropsType) => {
    console.log('here')
    const {title, allFiltersHandler, filter, deleteTodoList} = props
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(props.id, taskId, isDone)
        dispatch(action)
    } // second id is todolists id (props)
    const addNewTask = (title: string) => {
        const action = addTaskAC(props.id, title);
        dispatch(action)
    }
    const changeTodolistTitleHandler = (title: string) => props.changeTodolistTitleHandler(title, props.id)

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
    }


    function showTasks() {
        return tasksForTodolist.map(task => {

                const deleteTaskHandler = (taskId: string) => {
                    dispatch(deleteTaskAC(taskId, props.id))
                }
                const changeTaskTitleHandler = (title: string) => {
                    dispatch(changeTaskTitleAC(props.id, task.id, title))
                }

                return (
                    <li key={task.id} className={task.isDone ? s.isDone : ''}
                        style={{width: '100%', display: 'flex', alignItems: 'center', listStyleType: 'none'}}>
                        <IconButton onClick={() => deleteTaskHandler(task.id)}><Delete/></IconButton>
                        {/*<button onClick={() => deleteTaskHandler(task.id)}>&#10007;</button>*/}
                        <MyCheckBox checked={task.isDone} callback={(isDone) => changeIsDoneHandler(task.id, isDone)}/>
                        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}
                        />
                    </li>
                )
            }
        )
    }


    return (
        <Box sx={{mt: 3, mr: 1, ml: 1}}>
            <div>
                <Button onClick={() => deleteTodoList(props.id)}>X</Button>
                <EditableSpan title={title} changeTitleHandler={changeTodolistTitleHandler}/>
            </div>
            <div>
                <AddItemForm addItem={addNewTask}/>
                <ul style={{padding: 0}}>{showTasks()}</ul>
            </div>
            <div>
                <MyButton className={filter === 'all' ? 'contained' : 'outlined'} name={'all'}
                          callBack={() => allFiltersHandler(props.id, 'all')}/>
                <MyButton className={filter === 'active' ? 'contained' : 'outlined'} name={'active'}
                          callBack={() => allFiltersHandler(props.id, 'active')}/>
                <MyButton className={filter === 'completed' ? 'contained' : 'outlined'} name={'completed'}
                          callBack={() => allFiltersHandler(props.id, 'completed')}/>
            </div>
        </Box>
    );
};

export default Todolist;


{/*<button className={filter === 'all' ? s.activeFilter : ''} name={'all'} onClick={() => allFiltersHandler('all')}>All</button>*/
}
{/*<button className={filter === 'active' ? s.activeFilter : ''} name={'active'} onClick={() => allFiltersHandler('active')}>Active</button>*/
}
{/*<button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'} onClick={() => allFiltersHandler('completed')}>Completed</button>*/
}