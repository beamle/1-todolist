import React, {memo, useCallback} from 'react';
import {IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import {MyCheckBox} from "../../../../common/components/MyCheckBox/MyCheckBox";
import {EditableSpan} from "../../../../common/components/EditableSpan/EditableSpan";
import {useActions} from "../../../../app/store";
import {TaskStatuses, TaskType} from "./tasksAPI";
import {tasksActions} from "./index";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

const Task = ({task, todolistId}: TaskPropsType) => {
    const {id, status, title} = task
    const {updateTask, deleteTask} = useActions(tasksActions)


    const changeIsDoneHandler = useCallback((checked: boolean) => {
        const status = checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({todolistId, taskId: id, domainModel: {status}})
    }, [id, todolistId])

    const deleteTaskHandler = useCallback(() => {
        deleteTask({todolistId, taskId: id})
    }, [])

    const changeTaskTitleHandler = useCallback((title: string) => {
        updateTask({todolistId, taskId: id, domainModel: {title}})
    }, [])
    return (
        <div style={{ position: 'relative', margin: '12px'}}>
                <IconButton style={{ position: 'absolute', right: '0', padding: '0px'}} onClick={deleteTaskHandler}><Delete/></IconButton>
            <MyCheckBox checked={status} callback={changeIsDoneHandler}/>
            <EditableSpan title={title} changeTitleHandler={changeTaskTitleHandler} disabled={false}
            />
        </div>
    );
};

export default memo(Task);