import React, {ChangeEvent, FC, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faDeleteLeft, faTrash} from "@fortawesome/free-solid-svg-icons";
import s from "./AddItemForm.module.css"

type AddItemFormProps = {
    maxItemTitleLength: number
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormProps> = ({maxItemTitleLength, addItem}) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const isItemTitleLengthTooLong = title.length > maxItemTitleLength
    const isAddItemBtnDisabled = !title || isItemTitleLengthTooLong

    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(error) {
            setError(false)
        }
        if(!isItemTitleLengthTooLong){
            setTitle(e.currentTarget.value)
        }
    }

    const addItemToTodolist = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div className={s.addForm}>
            <input
                value={title}
                onChange={changeItemTitle}
                className={error ? "user-error" : undefined}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        addItemToTodolist()
                    }
                }}
            />
            <button
                disabled={isAddItemBtnDisabled}
                onClick={addItemToTodolist}>
                <FontAwesomeIcon icon={faCirclePlus} />
            </button>

            <button
                disabled={!title}
                onClick={()=>setTitle(title.slice(0, -1))}>
                <FontAwesomeIcon icon={faDeleteLeft} />
            </button>
            <button
                disabled={!title}
                onClick={()=>setTitle("")}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
            {isItemTitleLengthTooLong && <div>You title is too long</div>}
            {error && <div style={{"color": "red", "fontWeight": "bold"}}>Please, enter correct title</div>}
        </div>
    );
};

export default AddItemForm;