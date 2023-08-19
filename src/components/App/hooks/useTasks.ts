import {useState} from "react";
import {v1} from "uuid";
import {TasksType} from "../App";
import {todoListId1, todoListId2} from "../id-utils";
import {TaskType} from "../../Todolist/Todolist";

export function useTaskos() {
    let [tasks, setTasks] = useState<TasksType>({
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
        // let tasksArr = tasks[todoListId]
        // tasks[todoListId] = tasksArr.map(task => task.id === id ? {...task, isDone: newIsDone} : task)
        // setTasks({...tasks})
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(task => task.id === id ? {...task, isDone: newIsDone} : task)})
    }

    function deleteTask(id: string, todoListId: string) {
        let tasksArr = tasks[todoListId]
        let filteredTasks = tasksArr.filter(task => task.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let tasksArr = tasks[todoListId];
        tasks[todoListId] = [...tasksArr, newTask]
        setTasks({...tasks})
    }

    const changeTaskTitleHandler = (taskId: string, newTitle: string, todoListId: string) => {
        let newTasks = {...tasks}
        let taskToChange = newTasks[todoListId].find((task: TaskType) => task.id === taskId)
        if (taskToChange) {
            taskToChange.title = newTitle
            setTasks(newTasks)
        }
    }

    const removeTasksFromTodolist = (todolistId: string) => {
        delete tasks[todolistId]
        setTasks(tasks)
    }

    const addEmptyTasksArr = (todolistId: string) => {
        setTasks({...tasks, [todolistId]: []})
    }

    return {
        tasks,
        setTasks,
        changeIsDone,
        deleteTask,
        addTask,
        changeTaskTitleHandler,
        removeTasksFromTodolist,
        addEmptyTasksArr
    }
}