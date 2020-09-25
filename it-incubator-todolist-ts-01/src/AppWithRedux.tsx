import React, {useCallback} from 'react';
import './App.scss';
import {TodoList} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListAC, TodlistDomainType,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";





export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType,Array<TodlistDomainType>>(state => state.todolists);

    let tasks = useSelector<AppRootStateType,TaskStateType>(state => state.tasks);

    let dispatch = useDispatch();

    const removeTask = useCallback((taskId: string, todoListID: string)=> {
        dispatch(removeTasksAC(taskId, todoListID));
    },[dispatch]);

    const changeTaskStatus =useCallback((id: string, status: TaskStatuses, todoListID: string)=> {
        dispatch(changeTaskStatusAC(id,status,todoListID));
    },[dispatch]);

    const changeTaskTitle =useCallback((id: string, newTitle: string, todoListID: string)=> {
        dispatch(changeTaskTitleAC(id,newTitle,todoListID));
    },[dispatch]);

    const changeTodoListTitle =useCallback((todoListID: string, newTitle: string)=> {
        dispatch(ChangeTodoListTitleAC(newTitle,todoListID));
    },[dispatch]);


    const addTask =useCallback((newTaskName: string, todoListID: string)=> {
        dispatch(addTaskAC(newTaskName, todoListID));
    },[dispatch]);

    const changeTodoListFilter =useCallback((newFilterValue: FilterValuesType, toDoListId: string)=> {
        dispatch(ChangeTodoListFilterAC(newFilterValue, toDoListId));
    },[dispatch]);

    const removeTodoList =useCallback((toDoListId: string)=> {
        const action = RemoveTodoListAC(toDoListId);
        dispatch(action);
    },[dispatch]);


    const addTodoList = useCallback((title)=>{
        const action = AddTodoListAC(title);
        dispatch(action);
    },[dispatch])



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container style={{padding: "20px"}}><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container  spacing={1}>{
                    todoLists.map(tl => {
                        let tasksForTodoList = tasks[tl.id];

                        return (

                            <Grid item>
                                <Paper style={{padding: "20px"}} elevation={24}>
                                    <TodoList key={tl.id}
                                             tlId={tl.id}
                                             title={tl.title}
                                             tasks={tasksForTodoList}
                                             removeTask={removeTask}
                                             addTasks={addTask}
                                             changeTodoListFilter={changeTodoListFilter}
                                             changeTaskStatus={changeTaskStatus}
                                             filterValue={tl.filter}
                                             removeTodoList={removeTodoList}
                                             changeTaskTitle={changeTaskTitle}
                                             changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
