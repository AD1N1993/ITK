import React, {useReducer, useState} from 'react';
import './App.scss';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToDolist] = useReducer(todolistsReducer,[
        {id: todoListID1, title: "What to learn?", filter: "all"},
        {id: todoListID2, title: "What to Buy?", filter: "active"},
    ]);

    let [tasks, dispatchTask] = useReducer(tasksReducer,{
            [todoListID1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'CSS', isDone: false},
            ],
            [todoListID2]: [
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false},
                {id: v1(), title: 'SASS', isDone: false},
            ]
        }
    );

    function removeTask(taskId: string, todoListID: string) {
        dispatchTask(removeTasksAC(taskId, todoListID));
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        dispatchTask(changeTaskStatusAC(id,isDone,todoListID));

    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        dispatchTask(changeTaskTitleAC(id,newTitle,todoListID));
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatchToDolist(ChangeTodoListTitleAC(newTitle,todoListID));
    }


    function addTask(newTaskName: string, todoListID: string) {
        dispatchTask(addTaskAC(newTaskName, todoListID));
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, toDoListId: string) {
        dispatchToDolist(ChangeTodoListFilterAC(newFilterValue, toDoListId));
    }

    function removeTodoList(toDoListId: string) {
        const action = RemoveTodoListAC(toDoListId);
        dispatchToDolist(action);
        dispatchTask(action);

    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title);
        dispatchToDolist(action);
        dispatchTask(action);
    }

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
                        if (tl.filter === "active") {
                            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                        }

                        if (tl.filter === "completed") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                        }
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
                                /></Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;