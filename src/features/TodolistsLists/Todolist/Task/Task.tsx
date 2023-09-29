import React, {memo, useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {MyCheckBox} from "../../../../common/components/MyCheckBox/MyCheckBox";
import {EditableSpan} from "../../../../common/components/EditableSpan/EditableSpan";
import {useActions, useAppDispatch} from "../../../../app/store";
import {TaskStatuses, TaskType} from "./tasksAPI";
import {deleteTaskTC, updateTaskTC} from "./task-actions";
import {tasksActions} from "./index";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = ({task, todolistId}: TaskPropsType) => {
    const {id, status, title} = task
    const { updateTaskTC, deleteTaskTC } = useActions(tasksActions)


    const changeIsDoneHandler = useCallback((checked: boolean) => {
        const status =  checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTaskTC({todolistId, taskId: id, domainModel: {status} })
    },[id, todolistId])

    const deleteTaskHandler = useCallback((taskId: string) => {
        deleteTaskTC({todolistId, taskId})
    },[])

    const changeTaskTitleHandler = useCallback((title: string) => {
        updateTaskTC({todolistId, taskId: id, domainModel: {title} })
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