import React, {ChangeEvent, FC, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const tasksList = (props.tasks.length === 0)
        ? <p>TodoList is empty</p>
        :  <ul className={"tasks-list"}>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    return (
                        <li key={task.id} className={"tasks-list-item"}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                            </div>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle("")
    }

    const maxTaskTitleLength = 15
    const isTaskTitleLengthTooLong = title.length > maxTaskTitleLength
    const isAddTaskBtnDisabled = !title || isTaskTitleLengthTooLong
    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(false)
        }
        if(!isTaskTitleLengthTooLong){
            setTitle(e.currentTarget.value)
        }
    }

    return (
        <div className="todoList">
            <h3 className={"todolist-header"}><button onClick={() => props.removeTodoList(props.id)}>x</button>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTaskTitle}
                    className={error ? "user-error" : undefined}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            addTask()
                        }
                    }}
                />
                <button
                    disabled={isAddTaskBtnDisabled}
                    onClick={addTask}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                </button>

                <button
                    disabled={!title}
                    onClick={()=>setTitle(title.slice(0, -1))}>
                    <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
                <button
                    disabled={!title}
                    onClick={()=>setTitle("")}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                {isTaskTitleLengthTooLong && <div>You task title is too long</div>}
                {error && <div style={{"color": "red", "fontWeight": "bold"}}>Please, enter correct title</div>}
            </div>
            {tasksList}
            <div className={"buttons-block"}>
                <button
                    className={props.filter === "all" ? "btn-filter-active" : ''}
                    onClick={() => props.changeFilter("all", props.id)}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-filter-active" : ''}
                    onClick={() => props.changeFilter("active", props.id)}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-filter-active" : ''}
                    onClick={() => props.changeFilter("completed", props.id)}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;