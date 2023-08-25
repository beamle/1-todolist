import React, {memo, useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {MyCheckBox} from "../MyCheckBox/MyCheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../Todolist/reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "../../api/todolistsAPI";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = ({task, todolistId}: TaskPropsType) => {
    const {id, completed, title} = task
    const dispatch = useDispatch()

    const changeIsDoneHandler = useCallback((taskId: string, completed: boolean) => {
        const action = changeTaskStatusAC(todolistId, id, completed)
        dispatch(action)
    },[])

    const deleteTaskHandler = useCallback((taskId: string) => {
        dispatch(deleteTaskAC(id, todolistId))
    },[])

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, title))
    },[])
    return (
        <div>
            <IconButton onClick={() => deleteTaskHandler(id)}><Delete/></IconButton>
            {/*<button onClick={() => deleteTaskHandler(task.id)}>&#10007;</button>*/}
            <MyCheckBox checked={completed} callback={changeIsDoneHandler} taskId={id}/>
            <EditableSpan title={title} changeTitleHandler={changeTaskTitleHandler}
            />
        </div>
    );
};

export default memo(Task);