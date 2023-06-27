import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    className: string
    changeTitle: (title: string) => void
}
const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const onEditMode = () => {
        setIsEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const changeItemTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (
        isEditMode
            ? <input onChange={changeItemTitle} autoFocus onBlur={offEditMode} value={title}/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};

export default EditableSpan;