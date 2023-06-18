import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "../../App";
import Button from "../Button/Button";
import s from './Todolist.module.css';
import CheckBox from "../CheckBox/CheckBox";

type PropsType = {
    tasks: TaskType[]
    deleteTask: (id: string) => void
    addTask: (title: string) => void
    changeIsDone: (id: string, isDone: boolean) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = (props: PropsType) => {
    const {tasks, addTask} = props
    const [error, setError] = useState<string | null>('');
    const [inputText, setInputText] = useState('');
    const [filter, setFilter] = useState('all');

    function allFiltersHandler(filter: FilterValuesType) {
        return setFilter(filter)
    }

    function filteredTasks(): TaskType[] {
        if (filter === 'all') {
            return tasks
        }
        if (filter === 'active') {
            return tasks.filter(task => task.isDone)
        }
        if (filter === 'completed') {
            return tasks.filter(task => !task.isDone)
        }
        return tasks
    }

    function addTaskBtnHandle() {
        if (inputText.trim()) {
            addTask(inputText.trim())
            setInputText('')
        } else {
            setError('Title is required')
        }
    }

    function inputOnChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
        setError("")
    }

    const changeIsDoneHandler = (id: string, isDone: boolean) => {
        props.changeIsDone(id, isDone) // ! ne rabotaet s reduxom. Nuzhen event anyways.
    }

    function showTasks() {
        return filteredTasks().map(task => {

            const deleteTaskHandler = (taskId: string) => props.deleteTask(taskId) // just for training

            return (
                <li key={task.id} className={task.isDone ? s.isDone : ''}>
                    <button onClick={() => deleteTaskHandler(task.id)}>&#10007;</button>
                    <CheckBox checked={task.isDone} callback={(isDone) => changeIsDoneHandler(task.id, isDone)}/>
                    <span>{task.title}</span>
                    {/*/!*tut vstavitj <Button/>/*}*/}
                </li>
            )
        }
    )
    }


    return (
        <div>
            <div>{tasks[0].title}</div>
            <div>
                <input className={error ? s.error : ''} value={inputText} onChange={inputOnChangeHandle} onKeyDown={e => e.key === 'Enter' && addTaskBtnHandle()}/>
                <button onClick={addTaskBtnHandle}>+</button>
                {error &&  <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>{showTasks()}</ul>
            <div>
                {/*<button className={filter === 'all' ? s.activeFilter : ''} name={'all'} onClick={() => allFiltersHandler('all')}>All</button>*/}
                {/*<button className={filter === 'active' ? s.activeFilter : ''} name={'active'} onClick={() => allFiltersHandler('active')}>Active</button>*/}
                {/*<button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'} onClick={() => allFiltersHandler('completed')}>Completed</button>*/}
                <Button className={filter === 'all' ? s.activeFilter : ''} name={'all'} callBack={() => allFiltersHandler('all')}/>
                <Button className={filter === 'active' ? s.activeFilter : ''} name={'active'} callBack={() => allFiltersHandler('active')}/>
                <Button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'} callBack={() => allFiltersHandler('completed')}/>
            </div>
        </div>
    );
};

export default Todolist;