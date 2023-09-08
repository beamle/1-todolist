import {AppRootStateType, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTH,
    createTodolistTC,
    deleteTodolistTC,
    fetchTodolistTC,
    FilterValuesType,
    TodolistDomainType
} from "./Todolist/reducers/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Box, Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksType} from "./Todolist/Task/reducers/tasks-reducer";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {Navigate} from "react-router-dom";

type TodolistsList = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: TodolistsList) => {
    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    // const status = useSelector<AppRootStateType, RequestStatusType>(state => state.todolists.)
    // 1 parameter - kakoi globalnyj state, 2 - kakoi state sobiraemsja dostavatj

    useEffect(() => {
        if (demo || !isLoggedIn) return
        dispatch(fetchTodolistTC())
    }, [])

    // TODOLISTS MANIPULATION
    const deleteTodoList = useCallback((id: string) => {
        dispatch(deleteTodolistTC(id))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    const changeTodolistTitleHandler = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTH(todolistId, title))
    }, [])

    const allFiltersHandler = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
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