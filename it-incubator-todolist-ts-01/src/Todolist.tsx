import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {TaskType} from "./App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTasks: (newTaskName: string) => void
    changeFilter: (value: "all"| "active" | "completed") => void
}

export function TodoList(props: PropsType) {

    let [taskName, setTaskName] = useState("");
    let addTask = () => {
        props.addTasks(taskName);
        setTaskName("");
    }

    function onTaskNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value);
    }

    function onAddTaskKeyPressed(e:KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter'){
            addTask();
        }
    }

    function onAllClickHandler () {
        props.changeFilter('all');
    }
    function onActiveClickHandler () {
        props.changeFilter('active');
    }
    function onCompletedClickHandler () {
        props.changeFilter('completed');
    }




    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type={'text'}
                    value={taskName}
                    onChange={ onTaskNameChanged }
                    onKeyPress={onAddTaskKeyPressed}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    let removeTask = () => {props.removeTask(task.id)}
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );
}