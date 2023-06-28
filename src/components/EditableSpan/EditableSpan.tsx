import React, {ChangeEvent, FC, useState} from "react";

type EditableSpan = {
    title: string
    changeTitleHandler: (title: string) => void
}
export const EditableSpan: FC<EditableSpan> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitleHandler(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

    return editMode
        ? <input value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus/>
        : <span onDoubleClick={activateEditMode}
                >
            {props.title}</span>
}