import React, {ChangeEvent, FC, useState} from 'react';
import s from "../../features/TodolistsLists/Todolist/Todolist.module.css";
import MyButton from "@material-ui/core/Button";
import {IconButton, TextField} from "@material-ui/core";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Grid from "@mui/material/Grid";
import {useAddItemForm} from "./hooks/useAddItemForm";
import {RequestStatusType} from "../../app/app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean // storybook
    todolistStatus?: RequestStatusType
}

export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false, todolistStatus}) => {
    const {error, inputText, inputOnChangeHandle, addTaskBtnHandle} = useAddItemForm(addItem);
    return (
        <Grid container sx={{justifyContent: "center", mt: 1}}>
            <TextField error={!!error} value={inputText} onChange={inputOnChangeHandle}
                       onKeyDown={e => e.key === 'Enter' && addTaskBtnHandle()}
                       variant="outlined"
                       type="search"
                       label="Search field"
                       disabled={disabled || todolistStatus === 'loading'}/>
            {/*<MyButton onClick={addTaskBtnHandle} variant={'outlined'} color={"default"}>+</MyButton>*/}
            <IconButton onClick={addTaskBtnHandle} color='primary' disabled={!!error || todolistStatus === 'loading'}><AddTaskIcon/></IconButton>
            {error && <div className={s.errorMessage}>{error}</div>}
        </Grid>
    );
});
