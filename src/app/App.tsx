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
import LinearProgress from "@mui/material/LinearProgress";
import {AppRootStateType} from "../store";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Login } from '../components/Login/Login';

type AppPropsType = {
    demo?: boolean // used for Storybook fetching logic segregation
}

function App({demo = false}: AppPropsType) {
    console.log("APP is rerendered")
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <BrowserRouter>
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
                {status === 'loading' && <LinearProgress/>}
                <Container>
                    <Routes>
                        <Route path={"/"} element={<Login/>}/>
                        <Route path={"/TodolistsList"} element={<TodolistsList demo={demo}/>}/>
                    </Routes>
                    <ErrorSnackbar/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
