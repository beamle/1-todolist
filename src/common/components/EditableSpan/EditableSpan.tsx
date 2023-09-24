import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@material-ui/core";
import {Typography} from "@mui/material";

type EditableSpanProps = {
    title: string
    changeTitleHandler: (title: string) => void
    disabled: boolean
}
export const EditableSpan: FC<EditableSpanProps> = React.memo((props: EditableSpanProps) => {
    const {changeTitleHandler, disabled} = props;
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        changeTitleHandler(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);


    return editMode
        ? <TextField margin={"none"} value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus
                     InputProps={{disableUnderline: true}} disabled={disabled}
        />
        : <Typography onDoubleClick={activateEditMode}
                      variant="body2" display="inline"
        >
            {props.title}</Typography>
})