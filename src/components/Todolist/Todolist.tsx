import React, { ChangeEvent, FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {FilterValuesType} from "../../App";
import EditableSpan from "../EditableSpan/EditableSpan";
import {AddItemForm} from "../AddItemForm/AddItemForm";


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTodoListTitle: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}




const TodoList: FC<TodoListPropsType> = (props) => {

    const tasksList = (props.tasks.length === 0)
        ? <p>TodoList is empty</p>
        : <ul className={"tasks-list"}>
            {
                props.tasks.map((task) => {
                    const changeNewTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId)
                    const removeTask = () => props.removeTask(task.id, props.todoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                    return (
                        <li key={task.id} className={"tasks-list-item"}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <span className={task.isDone ? "task-done" : "task"}>
                                    <EditableSpan title={task.title} changeTitle={changeNewTaskTitle} className={'default'}/>
                                </span>
                            </div>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })
            }
        </ul>

    const addTask = (title: string) => props.addTask(title, props.todoListId)

    const maxTaskTitleLength = 15

    return (
        <div className="todoList">
            <h3 className={"todolist-header"}>
                <EditableSpan title={props.title} changeTitle={(title: string) => props.changeTodoListTitle(title, props.todoListId)}  className={'default'}/>
                <button onClick={() => props.removeTodoList(props.todoListId)}>x</button>
            </h3>

            <AddItemForm maxTaskTitleLength={maxTaskTitleLength} addItem={addTask} />

            {tasksList}
            <div className={"buttons-block"}>
                <button
                    className={props.filter === "all" ? "btn-filter-active" : undefined}
                    onClick={() => props.changeFilter("all", props.todoListId)}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-filter-active" : undefined}
                    onClick={() => props.changeFilter("active", props.todoListId)}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-filter-active" : undefined}
                    onClick={() => props.changeFilter("completed", props.todoListId)}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;