import {useActions} from "../../app/store";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Box, Grid, Paper, CssBaseline} from "@mui/material";
import {AddItemForm} from "../../common/components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {todoListsSelector} from "./Todolist/todolist-selectors";
import {appSelectors} from "../../app";
import {todolistsActions} from "./Todolist";
import Container from "@mui/material/Container";

// Custom scrollbar CSS
const customScrollbarStyles = {
    '::-webkit-scrollbar': {
        width: '8px',
    },
    '::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
        background: '#6b778c',
        borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
        background: '#485162',
    },
    '::-webkit-scrollbar-thumb:active': {
        background: '#38404c',
    },
};

type TodolistsList = {
    demo?: boolean;
};

export const TodolistsList = ({demo = false}: TodolistsList) => {
    const todoLists = useSelector(todoListsSelector);
    const isLoggedIn = useSelector(appSelectors.isLoggedInSelector);
    const {fetchTodolistTC, createTodolistTC, changeTodolistTitleTC} =
        useActions(todolistsActions);

    useEffect(() => {
        if (demo || !isLoggedIn) return;
        fetchTodolistTC();
    }, []);

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid>
                    <AddItemForm addItem={createTodolistTC}/>
                </Grid>
            </Grid>
            <Grid container spacing={1}
                  sx={{
                      flexWrap: 'nowrap', overflowX: 'scroll', position: 'relative', bottom: 0, left: 0, right: 0,
                      ...customScrollbarStyles,
                  }}>

                {todoLists.map((tl) => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper sx={{width: '300px'}}>
                                <Todolist
                                    key={tl.id}
                                    todolist={tl}
                                    filter={tl.filter}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
