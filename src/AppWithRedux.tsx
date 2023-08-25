import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import Container from '@material-ui/core/Container';
import {Box, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistTC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType
} from "./components/Todolist/reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppRootStateType, useAppDispatch} from "./store";
import {TaskType, todolistsAPI} from "./api/todolistsAPI";

// export type FilterValuesType = 'all' | 'active' | 'completed'
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
export type TasksType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    console.log("APP is rerendered")
    const dispatch = useAppDispatch()
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]> ( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType> ( state => state.tasks)
    // 1 parameter - kakoi globalnyj state, 2 - kakoi state sobiraemsja dostavatj

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    // TODOLISTS MANIPULATION
    const deleteTodoList = useCallback( (id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

    const changeTodolistTitleHandler = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }, [])

    const allFiltersHandler = useCallback( (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [])

    return (
        <div className="App">
            <Container>
                <Grid container spacing={1}>
                    <Grid >
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
                                    />
                                </Paper>
                            </Grid>
                        })}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default AppWithRedux;
