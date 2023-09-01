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

type TodolistsList = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: TodolistsList) => {
    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    // 1 parameter - kakoi globalnyj state, 2 - kakoi state sobiraemsja dostavatj

    useEffect(() => {
        console.log(demo)
        if (demo) return
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

    return <>
        <Grid container spacing={1}>
            <Grid>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
        </Grid>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={1}>
                {todoLists.map(tl => {

                    return <Grid>
                        <Paper>
                            <Todolist key={tl.id}
                                      id={tl.id}
                                      title={tl.title}
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