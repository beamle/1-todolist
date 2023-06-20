import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from "../../App";
import Button from "../Button/Button";
import s from './Todolist.module.css';
import CheckBox from "../CheckBox/CheckBox";

type PropsType = {
    id: string
    tasks: TaskType[]
    title: string
    deleteTask: (id: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeIsDone: (id: string, isDone: boolean, todoListId: string) => void
    allFiltersHandler: (filter: FilterValuesType, todoListId: string) => void
    filter: FilterValuesType
    deleteTodoList: (id: string) => void
    addTodoList: () => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

const Todolist = (props: PropsType) => {
    const {tasks, addTask, title, allFiltersHandler, filter, id, deleteTodoList} = props
    const [error, setError] = useState<string | null>('');
    const [inputText, setInputText] = useState('');

    function addTaskBtnHandle() {
        if (inputText.trim()) {
            addTask(inputText.trim(), id)
            setInputText('')
        } else {
            setError('Title is required')
        }
    }

    function inputOnChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
        setError("")
    }

    const changeIsDoneHandler = (taskId: string, isDone: boolean) => props.changeIsDone(taskId, isDone, id) // second id is todolists id (props)

    function showTasks() {
        return tasks.map(task => {

                const deleteTaskHandler = (taskId: string) => props.deleteTask(taskId, id) // just for training

                return (
                    <li key={task.id} className={task.isDone ? s.isDone : ''}>
                        <button onClick={() => deleteTaskHandler(task.id)}>&#10007;</button>
                        <CheckBox checked={task.isDone} callback={(isDone) => changeIsDoneHandler(task.id, isDone)}/>
                        <span>{task.title}</span>
                    </li>
                )
            }
        )
    }


    return (
        <div>
            <div>
                <button onClick={() => deleteTodoList(id)}>X</button>
                <button onClick={props.addTodoList}>+</button>
                {title}</div>
            <div>
                <input className={error ? s.error : ''} value={inputText} onChange={inputOnChangeHandle}
                       onKeyDown={e => e.key === 'Enter' && addTaskBtnHandle()}/>
                <button onClick={addTaskBtnHandle}>+</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>{showTasks()}</ul>
            <div>
                {/*<button className={filter === 'all' ? s.activeFilter : ''} name={'all'} onClick={() => allFiltersHandler('all')}>All</button>*/}
                {/*<button className={filter === 'active' ? s.activeFilter : ''} name={'active'} onClick={() => allFiltersHandler('active')}>Active</button>*/}
                {/*<button className={filter === 'completed' ? s.activeFilter : ''} name={'completed'} onClick={() => allFiltersHandler('completed')}>Completed</button>*/}
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