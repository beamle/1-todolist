import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';
import {TaskStatuses} from "../../../features/TodolistsLists/Todolist/Task/tasksAPI";


type InputTypeProps = {
    // taskId: string
    checked?: TaskStatuses
    callback: (checked: boolean) => void
}

export const MyCheckBox = ({checked, callback}: InputTypeProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked)
        // тут чекед будет измененнный, т.к чебокс сперва меняет значение,
        // а затем срабатывает 'change' event и наш обьект Event будет уже иметь новове значние чебокса
    }

    return (
        <Checkbox checked={checked === TaskStatuses.Completed} onChange={onChangeHandler}/>
    );
};
