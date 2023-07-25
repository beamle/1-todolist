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
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTdReducer] = useReducer(todolistsReducer,[
        {id: todoListId1, title: "Todo", filter: "active"},
        {id: todoListId2, title: "Finished", filter: "completed"}
    ])
    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Angular", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ],
    });

    // TASKS MANIPULATION
    function changeIsDone(id: string, newIsDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(todoListId, id, newIsDone)
        dispatchToTasksReducer(action)
    }

    function deleteTask(id: string, todoListId: string) {
        const action = deleteTaskAC(id, todoListId);
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(todoListId, title);
        dispatchToTasksReducer(action)
    }

    const changeTaskTitleHandler = (taskId: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(todoListId, taskId, newTitle)
        dispatchToTasksReducer(action)
        }


    // TODOLISTS MANIPULATION
    const deleteTodoList = (id: string) => {
        dispatchToTdReducer(removeTodolistAC(id))
    }

    function addTodolist(title: string) {
        let todolistId = v1()
        dispatchToTdReducer(addTodolistAC(title, todolistId))
        dispatchToTasksReducer(addTodolistAC(title, todolistId))
    }

    const changeTodolistTitleHandler = (todolistId: string, title: string) => {
        dispatchToTdReducer(changeTodolistTitleAC(todolistId, title))
    }

    const allFiltersHandler = (todoListId: string, filter: FilterValuesType) => {
        dispatchToTdReducer(changeTodolistFilterAC(todoListId, filter))
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
                            let tasksForTodolist = tasks[tl.id]

                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                            }

                            return <Grid>
                                <Paper>
                                    <Todolist key={tl.id}
                                              id={tl.id}
                                              tasks={tasksForTodolist}
                                              title={tl.title}
                                              deleteTask={deleteTask}
                                              addTask={addTask}
                                              changeIsDone={changeIsDone}
                                              changeTaskTitleHandler={changeTaskTitleHandler}
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