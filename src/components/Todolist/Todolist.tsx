import React from 'react';
import {FilterValuesType} from "../../App";
import Button from "../Button/Button";
import s from './Todolist.module.css';
import CheckBox from "../CheckBox/CheckBox";
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type PropsType = {
    id: string
    tasks: TaskType[]
    title: string
    deleteTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeIsDone: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitleHandler: (id: string, title: string, todoListId: string) => void
    changeTodolistTitleHandler: (todolistId: string, title: string) => void
    allFiltersHandler: (filter: FilterValuesType, todoListId: string) => void
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
    const {tasks, addTask, title, allFiltersHandler, filter, id, deleteTodoList} = props

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => props.changeIsDone(taskId, isDone, id) // second id is todolists id (props)
    const addNewTask = (title: string) => addTask(title,id)
    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitleHandler(title, id)
    }

    function showTasks() {
        return tasks.map(task => {

                const deleteTaskHandler = (taskId: string) => props.deleteTask(taskId, id) // just for training
                const changeTaskTitleHandler = (title:string) => props.changeTaskTitleHandler(task.id, title, id)

                return (
                    <li key={task.id} className={task.isDone ? s.isDone : ''}>
                        <button onClick={() => deleteTaskHandler(task.id)}>&#10007;</button>
                        <CheckBox checked={task.isDone} callback={(isDone) => changeIsDoneHandler(task.id, isDone)}/>
                        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
                    </li>
                )
            }
        )
    }


    return (
        <div>
            <div>
                <button onClick={() => deleteTodoList(id)}>X</button>
                <EditableSpan title={title} changeTitleHandler={changeTodolistTitleHandler}/>
            </div>
            <AddItemForm addItem={addNewTask}/>
            <ul>{showTasks()}</ul>
            <div>
                <Button className={filter === 'all' ? s.activeFilter : ''} name={'all'}
                        callBack={() => allFiltersHandler('all', id)}/>
                <Button className={filter === 'active' ? s.activeFilter : ''} name={'active'}
                        callBack={() => allFiltersHandler('active', id)}/>
                <Button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'}
                        callBack={() => allFiltersHandler('completed', id)}/>
            </div>
        </div>
    );
};

export default Todolist;


{/*<button className={filter === 'all' ? s.activeFilter : ''} name={'all'} onClick={() => allFiltersHandler('all')}>All</button>*/}
{/*<button className={filter === 'active' ? s.activeFilter : ''} name={'active'} onClick={() => allFiltersHandler('active')}>Active</button>*/}
{/*<button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'} onClick={() => allFiltersHandler('completed')}>Completed</button>*/}