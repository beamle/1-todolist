import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {ClassNameType, MyButton} from "../../../common/components/Button/Button";
import Button from "@material-ui/core/Button";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import Task from "./Task/Task";
import {AppRootStateType, useActions, useAppDispatch} from "../../../app/store";
import {FilterValuesType, TodolistDomainType} from "./reducers/todolists-reducer";
import {TaskStatuses, TaskType} from './Task/tasksAPI';
import {todolistsActions} from "./index";
import {tasksActions} from "./Task";

type PropsType = {
    todolist: TodolistDomainType
    filter: FilterValuesType
    addTodoList?: () => void
    demo?: boolean
}


export const Todolist = React.memo((props: PropsType) => {
    const {todolist, filter, demo = false} = props
    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])
    const {changeTodolistFilter, changeTodolistTitleTC, deleteTodolistTC} = useActions(todolistsActions);
    const {fetchTasks, addTask} = useActions(tasksActions);

    useEffect(() => {
        if (demo) return
        fetchTasks(todolist.id)
    }, [])

    const addNewTask = useCallback((title: string) => {
        addTask({todolistId: todolist.id, title})
    }, [todolist.id, todolist.title])

    const changeTodolistTitle = useCallback((title: string) => changeTodolistTitleTC({
        title,
        todolistId: todolist.id
    }), [])

    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
    }

    const deleteTodolistHandler = () => {
        deleteTodolistTC(todolist.id)
    }

    function showTasks() {
        return tasksForTodolist.map(task => {
            return (
                <Task key={task.id} task={task} todolistId={todolist.id}/>
            )
        })
    }


    return (
        <Box sx={{mt: 3, mr: 0, ml: 1, position: 'relative'}}>
                <Button style={{position: 'absolute', right: '0', padding: '0px', minWidth: '26px'}} onClick={deleteTodolistHandler}
                        disabled={todolist.entityStatus === 'loading'}>X</Button>
                <h2 style={{margin: '15px 5px 5px 5px', display: 'flex', justifyContent: 'center'}}>
                    <EditableSpan title={todolist.title} changeTitleHandler={changeTodolistTitle}
                                  disabled={todolist.entityStatus === 'loading'}/>
                </h2>
            <div>
                <AddItemForm addItem={addNewTask} todolistStatus={todolist.entityStatus}/>
                <ul style={{padding: 0}}>{showTasks()}</ul>
            </div>
            { !tasksForTodolist.length && <div style={{ padding: '15px', color: 'grey'}}>Add task</div> }
            <div>
                <MyButton className={filter === 'all' ? 'contained' : 'outlined'} name={'all'}
                          callBack={() => changeTodolistFilter({todoListId: todolist.id, filter: 'all'})}/>
                <MyButton className={filter === 'active' ? 'contained' : 'outlined'} name={'active'}
                          callBack={() => changeTodolistFilter({todoListId: todolist.id, filter: 'active'})}/>
                <MyButton className={filter === 'completed' ? 'contained' : 'outlined'} name={'completed'}
                          callBack={() => changeTodolistFilter({todoListId: todolist.id, filter: 'completed'})}/>
            </div>
        </Box>
    );
});