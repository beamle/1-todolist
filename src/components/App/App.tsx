import React from 'react';
import '../../App.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import Container from '@material-ui/core/Container';
import {Box, Grid, Paper} from "@mui/material";
import {useTodolists} from "./hooks/useTodolists";
import {useTaskos} from "./hooks/useTasks";

//
// export type FilterValuesType = 'all' | 'active' | 'completed'
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksType = {
//     [key: string]: TaskType[]
// }

function App() {
    // const { tasks, setTasks, changeIsDone, deleteTask, addTask, changeTaskTitleHandler, removeTasksFromTodolist,
    //     addEmptyTasksArr} = useTaskos();
    // const { todoLists, setTodoLists, deleteTodoList, addTodolist, changeTodolistTitleHandler, allFiltersHandler}
    //     = useTodolists(removeTasksFromTodolist, addEmptyTasksArr);

    return (
        <div className="App">
            {/*<Container>*/}
            {/*    <Grid container spacing={1}>*/}
            {/*        <Grid >*/}
            {/*            <AddItemForm addItem={addTodolist}/>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*    <Box sx={{flexGrow: 1}}>*/}
            {/*        <Grid container spacing={1}>*/}
            {/*            {todoLists.map(tl => {*/}
            {/*                let tasksForTodolist = tasks[tl.id]*/}

            {/*                if (tl.filter === 'active') {*/}
            {/*                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)*/}
            {/*                }*/}
            {/*                if (tl.filter === 'completed') {*/}
            {/*                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)*/}
            {/*                }*/}

            {/*                return <Grid>*/}
            {/*                    <Paper>*/}
            {/*                        <Todolist key={tl.id}*/}
            {/*                                  id={tl.id}*/}
            {/*                                  tasks={tasksForTodolist}*/}
            {/*                                  title={tl.title}*/}
            {/*                                  deleteTask={deleteTask}*/}
            {/*                                  addTask={addTask}*/}
            {/*                                  changeIsDone={changeIsDone}*/}
            {/*                                  changeTaskTitleHandler={changeTaskTitleHandler}*/}
            {/*                                  allFiltersHandler={allFiltersHandler}*/}
            {/*                                  filter={tl.filter}*/}
            {/*                                  deleteTodoList={deleteTodoList}*/}
            {/*                                  changeTodolistTitleHandler={changeTodolistTitleHandler}*/}
            {/*                        />*/}
            {/*                    </Paper>*/}
            {/*                </Grid>*/}
            {/*            })}*/}
            {/*        </Grid>*/}
            {/*    </Box>*/}
            {/*</Container>*/}
        </div>
    );
}

export default App;
function useTasks(): { deleteTodoList: any; addTodolist: any; changeTodolistTitleHandler: any; allFiltersHandler: any; } {
    throw new Error('Function not implemented.');
}

