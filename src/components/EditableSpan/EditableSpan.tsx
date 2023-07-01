import React, {ChangeEvent, FC, useState} from "react";
import {TextField} from "@material-ui/core";
import {Typography} from "@mui/material";

type EditableSpanProps = {
    title: string
    changeTitleHandler: (title: string) => void
}
export const EditableSpan: FC<EditableSpanProps> = (props) => {
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
        ? <TextField margin={"none"} value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus
                     InputProps={{disableUnderline: true}}
        />
        : <Typography onDoubleClick={activateEditMode}
                      variant="body2" display="inline"
        >
            {props.title}</Typography>
}