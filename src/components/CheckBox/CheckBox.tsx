import React, {ChangeEvent} from 'react';

type InputTypeProps = {
    checked?: boolean
    callback: (isDone: boolean) => void
}

const CheckBox = ({checked, callback}: InputTypeProps) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked) // тут чекед будет измененнный, т.к чебокс сперва меняет значение,
        // а затем срабатывает 'change' event и наш обьект Event будет уже иметь новове значние чебокса
    }

    return (
        <input type="checkbox" checked={checked} onChange={onChangeHandler}/>
    );
};

export default CheckBox;