import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';



type InputTypeProps = {
    taskId: string
    checked?: boolean
    callback: (taskId: string, isDone: boolean) => void
}

export const MyCheckBox = ({checked, callback, taskId}: InputTypeProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(taskId, e.currentTarget.checked)
        // тут чекед будет измененнный, т.к чебокс сперва меняет значение,
        // а затем срабатывает 'change' event и наш обьект Event будет уже иметь новове значние чебокса
    }

    return (
        <Checkbox checked={checked} onChange={onChangeHandler}/>
    );
};
