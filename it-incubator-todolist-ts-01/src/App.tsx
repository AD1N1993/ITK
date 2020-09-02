import React, {useState} from 'react';
import './App.scss';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: "What to learn?", filter: "all"},
        {id: todoListID2, title: "What to Buy?", filter: "active"},
    ]);

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }

    function changeTaskStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }


    function addTask(newTaskName: string, todoListID: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks];
        setTasks({...tasks});
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, toDoListId: string) {
        let toDoList = todoLists.find(tl => tl.id === toDoListId);
        if (toDoList) {
            toDoList.filter = newFilterValue;
        }
        setTodoLists([...todoLists]);
    }

    function removeTodoList(toDoListId: string) {
        delete tasks[toDoListId];
        setTasks({...tasks});
        setTodoLists(todoLists.filter(tl => tl.id !== toDoListId));

    }

    function addTodoList(title: string) {
        let newTodoListID = v1();
        let newTodolist: TodoListsType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        };
        setTodoLists([...todoLists, newTodolist]);
        setTasks({
            ...tasks, [newTodoListID]: []
        })
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

export default App;
