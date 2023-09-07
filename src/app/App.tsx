import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/TodolistsLists/TodolistsList";
import {CustomizedSnackbars as ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from '@mui/icons-material';
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {AppRootStateType, useAppDispatch} from "../store";
import {useSelector} from "react-redux";
import {RequestStatusType} from "./app-reducer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from '../features/Login/Login';
import {authMeTC, logOut} from "../features/Login/login-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

type AppPropsType = {
    demo?: boolean // used for Storybook fetching logic segregation
}

function App({demo = false}: AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.isInitialized)
    const dispatch = useAppDispatch();

    useEffect(() => {
        debugger
        dispatch(authMeTC())
    }, [])

    if(!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    console.log(isInitialized)
    if(!isInitialized) {
        return  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}> <CircularProgress size="5rem"/> </Box>
    }
    console.log(isLoggedIn, 'isloggedin')
    console.log(isInitialized, 'isInitialized')
    console.log(status, 'status')
    // if (isLoggedIn) {
    //     return <Navigate to="/"/>
    // }

    return (
        <BrowserRouter>
            {!isLoggedIn && <Navigate to="/login"/>}
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>News</Typography>
                        <Button onClick={() => dispatch(logOut())} color="inherit">{isLoggedIn ? "Logout" : "Login"}</Button>
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress/>}
                <Container>
                    <Routes>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/"} element={<TodolistsList demo={demo}/>}/>
                    </Routes>
                    <ErrorSnackbar/>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
