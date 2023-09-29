import {useActions, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {changeTodolistFilterAC, FilterValuesType} from "./Todolist/reducers/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Box, Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../common/components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {todoListsSelector} from "./Todolist/todolist-selectors";
import {appSelectors} from "../../app";
import {changeTodolistTitleTC, createTodolistTC, deleteTodolistTC, fetchTodolistTC} from "./Todolist/todolist-actions";
import {todolistActions} from "./index";

type TodolistsList = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: TodolistsList) => {
    const dispatch = useAppDispatch()
    const todoLists = useSelector(todoListsSelector)
    const isLoggedIn = useSelector(appSelectors.isLoggedInSelector)
    const { fetchTodolistTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } = useActions(todolistActions);

    // const status = useSelector<AppRootStateType, RequestStatusType>(state => state.todolists.)
    // 1 parameter - kakoi globalnyj state, 2 - kakoi state sobiraemsja dostavatj

    useEffect(() => {
        if (demo || !isLoggedIn) return
        fetchTodolistTC()
    }, [])

    // TODOLISTS MANIPULATION
    const deleteTodoList = useCallback((id: string) => {
        deleteTodolistTC(id)
    }, [])

    const addTodolist = useCallback((title: string) => {
        createTodolistTC(title)
    }, [])

    const changeTodolistTitleHandler = useCallback((title: string, todolistId: string) => {
        changeTodolistTitleTC({todolistId, title})
    }, [])

    const allFiltersHandler = useCallback((todoListId: string, filter: FilterValuesType) => {
        changeTodolistFilterAC({todoListId, filter})
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }

    return <>
        <Grid container spacing={1}>
            <Grid>
                <AddItemForm addItem={addTodolist} />
            </Grid>
        </Grid>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                {todoLists.map(tl => {

                    return <Grid key={tl.id}>
                        <Paper>
                            <Todolist key={tl.id}
                                      todolist={tl}
                                      allFiltersHandler={allFiltersHandler}
                                      filter={tl.filter}
                                      deleteTodoList={deleteTodoList}
                                      changeTodolistTitleHandler={changeTodolistTitleHandler}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>
                })}

            </Grid>
        </Box></>
}