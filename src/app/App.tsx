import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {TodolistsList} from "../features/TodolistsLists/TodolistsList";
import {CustomizedSnackbars as ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Menu} from '@mui/icons-material';
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch} from "./store";
import {Route, Routes} from "react-router-dom";
import {Login} from '../features/Login/Login';
import {logOutTC} from "../features/Login/login-reducer";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {authMeTC} from "./app-reducer";
import {appSelectors} from "./index";
import {isInitializedSelector, isLoggedInSelector, statusSelector} from "./app.selectors";

type AppPropsType = {
    demo?: boolean // used for Storybook fetching logic segregation
}

function App({demo = false}: AppPropsType) {
    const dispatch = useAppDispatch();
    const status = useSelector(statusSelector)
    const isLoggedIn = useSelector(isLoggedInSelector)
    const isInitialized = useSelector(isInitializedSelector)

    useEffect(() => {
        dispatch(authMeTC())
    }, [])

    const logout = () => {
        dispatch(logOutTC())
    }

    if(!isInitialized) {
        return  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}> <CircularProgress size="5rem"/> </Box>
    }

    return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>News</Typography>
                        <Button onClick={logout} color="inherit">{isLoggedIn && "Logout"}</Button>
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

    );
}

export default App;
