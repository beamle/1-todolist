import React, {memo, useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {MyCheckBox} from "../../../../components/MyCheckBox/MyCheckBox";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {deleteTaskTC, updateTaskTH} from "./reducers/tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";
import {useAppDispatch} from "../../../../store";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = ({task, todolistId}: TaskPropsType) => {
    const {id, status, title} = task
    const dispatch = useAppDispatch()

    const changeIsDoneHandler = useCallback((checked: boolean) => {
        const status =  checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTH(todolistId, id, {status}))
    },[id, todolistId])

    const deleteTaskHandler = useCallback((taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    },[])

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(updateTaskTH(todolistId, id, {title}))
    },[])
    return (
        <div>
            <IconButton onClick={() => deleteTaskHandler(id)}><Delete/></IconButton>
            {/*<button onClick={() => deleteTaskHandler(task.id)}>&#10007;</button>*/}
            <MyCheckBox checked={status} callback={changeIsDoneHandler}/>
            <EditableSpan title={title} changeTitleHandler={changeTaskTitleHandler} disabled={false}
            />
        </div>
    );
};

export default memo(Task);