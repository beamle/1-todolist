import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import Container from '@material-ui/core/Container';
import {Box, Grid, Paper} from "@mui/material";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./components/Todolist/reducers/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    tasksReducer
} from "./components/Todolist/reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, TodoListType[]> ( state => state.todolists)
    const tasks = useSelector<AppRootState, TasksType> ( state => state.tasks)
    // 1 parameter - kakoi globalnyj state, 2 - kakoi state sobiraemsja dostavatj

    // TODOLISTS MANIPULATION
    const deleteTodoList = (id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTodolistTitleHandler = (title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }

    const allFiltersHandler = (todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }

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

export default App;
