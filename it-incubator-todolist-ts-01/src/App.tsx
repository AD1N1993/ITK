import React, {useState} from 'react';
import './App.scss';
import {TodoList} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskStatuses, TaskType, TodoTaskPriorities} from "./api/todolist-api";
import {FilterValuesType, TodlistDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodlistDomainType>>([
        {id: todoListID1, title: "What to learn?", filter: "all", addedDate:"", order:0},
        {id: todoListID2, title: "What to Buy?", filter: "active",addedDate:"", order:1},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
            [todoListID1]: [
                {id: v1(), title: 'HTML', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: todoListID1 },
                {id: v1(), title: 'CSS', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: todoListID1 },
                {id: v1(), title: 'JS', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: todoListID1 },
            ],
            [todoListID2]: [
                {id: v1(), title: 'React', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                    priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: todoListID2 },
                {id: v1(), title: 'Angular', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                    priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: todoListID2 },
                {id: v1(), title: 'Vue', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                    priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: todoListID2 },
            ]
        }
    );

    function removeTask(taskId: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }

    function changeTaskStatus(id: string, status: TaskStatuses, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.status = status;
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
        let newTask = {id: v1(), title: 'NewTASK', status: TaskStatuses.New,addedDate:"",deadline:"", description:"",
            priority: TodoTaskPriorities.Low, order:0, startDate:"",  todoListId: todoListID };
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
        let newTodolist: TodlistDomainType = {
            id: newTodoListID,
            title: title,
            filter: "all",
            order:0,
            addedDate:""
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
                            tasksForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                        }

                        if (tl.filter === "completed") {
                            tasksForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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
