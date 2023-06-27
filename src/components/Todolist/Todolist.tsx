import React, {ChangeEvent, FC, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {FilterValuesType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

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

    const maxTaskTitleLength = 15;
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
                                <EditableSpan title={task.title} className={task.isDone ? "task-done" : "task"} changeTitle={() => {}}/>
                            </div>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }



    return (
        <div className="todoList">
            <h3 className={"todolist-header"}><button onClick={() => props.removeTodoList(props.id)}>x</button>{props.title}</h3>
            <AddItemForm maxItemTitleLength={maxTaskTitleLength} addItem={addTask}/>
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