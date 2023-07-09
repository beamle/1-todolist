import React, {ChangeEvent, FC, useState} from 'react';
import s from "../Todolist/Todolist.module.css";
import MyButton from "@material-ui/core/Button";
import {IconButton, TextField} from "@material-ui/core";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Grid from "@mui/material/Grid";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}

const AddItemForm: FC<AddItemFormPropsType> = ({addItem}) => {
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
        <Grid container sx={{justifyContent: "center", mt: 1}}>
            <TextField error={!!error} value={inputText} onChange={inputOnChangeHandle}
                       onKeyDown={e => e.key === 'Enter' && addTaskBtnHandle()}
                       variant="outlined"
                       type="search"
                       label="Search field"/>
            {/*<MyButton onClick={addTaskBtnHandle} variant={'outlined'} color={"default"}>+</MyButton>*/}
            <IconButton onClick={addTaskBtnHandle} color='primary'><AddTaskIcon/></IconButton>
            {error && <div className={s.errorMessage}>{error}</div>}
        </Grid>
    );
};

export default AddItemForm;