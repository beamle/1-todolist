import React, {ChangeEvent, FC, useState} from 'react';
import s from "../Todolist/Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

const AddItemForm: FC<AddItemFormPropsType>= ({addItem}) => {
    const [error, setError] = useState<string | null>('');
    const [inputText, setInputText] = useState('');

    function addTaskBtnHandle() {
        if (inputText.trim()) {
            addItem(inputText.trim())
            setInputText('')
        } else {
            setError('Title is required')
        }
    }

    function inputOnChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
        setError("")
    }


    return (
        <div>
            <input className={error ? s.error : ''} value={inputText} onChange={inputOnChangeHandle}
                   onKeyDown={e => e.key === 'Enter' && addTaskBtnHandle()}/>
            <button onClick={addTaskBtnHandle}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

export default AddItemForm;