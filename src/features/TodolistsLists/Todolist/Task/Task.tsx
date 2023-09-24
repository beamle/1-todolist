import React, {memo, useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {MyCheckBox} from "../../../../common/components/MyCheckBox/MyCheckBox";
import {EditableSpan} from "../../../../common/components/EditableSpan/EditableSpan";
import {deleteTaskTC, updateTaskTH} from "./reducers/tasks-reducer";
import {useAppDispatch} from "../../../../app/store";
import {TaskStatuses, TaskType} from "./tasksAPI";

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
            <MyCheckBox checked={status} callback={changeIsDoneHandler}/>
            <EditableSpan title={title} changeTitleHandler={changeTaskTitleHandler} disabled={false}
            />
        </div>
    );
};

export default memo(Task);