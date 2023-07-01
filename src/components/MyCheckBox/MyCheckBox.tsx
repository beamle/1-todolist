import React, {ChangeEvent} from 'react';
import Checkbox from '@mui/material/Checkbox';



type InputTypeProps = {
    checked?: boolean
    callback: (isDone: boolean) => void
}

export const MyCheckBox = ({checked, callback}: InputTypeProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked) // тут чекед будет измененнный, т.к чебокс сперва меняет значение,
        // а затем срабатывает 'change' event и наш обьект Event будет уже иметь новове значние чебокса
    }


    return (
        <Checkbox checked={checked} onChange={onChangeHandler}/>
    );
};
