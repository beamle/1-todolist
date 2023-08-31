import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import {TaskType} from "../api/todolistsAPI";
import {TodolistsList} from "../features/TodolistsLists/TodolistsList";
import {CustomizedSnackbars as ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {AppBar, IconButton, Typography} from "@material-ui/core";
import Toolbar from '@mui/material/Toolbar';
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";


function App() {
    console.log("APP is rerendered")


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <ErrorSnackbar/>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
