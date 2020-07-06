import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {
                id: v1(),
                title: 'HTML',
                isDone: true
            },
            {
                id: v1(),
                title: 'JS',
                isDone: false
            },
            {
                id: v1(),
                title: 'CSS',
                isDone: false
            },
            {
                id: v1(),
                title: 'Rest API',
                isDone: false
            },
            {
                id: v1(),
                title: 'GraphQL',
                isDone: false
            }
        ]
    );

    let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter((t: TaskType) => t.id !== taskId);
        setTasks(filteredTasks)
    }

    function addTask(newTaskName:string) {
        let newTask = { id: v1(), title: newTaskName, isDone: false }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeFilter(value: "all" | "active" | "completed") {
        setFilter(value);
    }


    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }


    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTasks = {addTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
