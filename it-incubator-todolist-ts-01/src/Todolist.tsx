import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListId: string) => void
    addTasks: (newTaskName: string, toDoListId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, toDoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, toDoListId: string) => void
    filterValue: FilterValuesType
    removeTodoList: (toDoListId: string) => void
}

export function TodoList(props: PropsType) {

    let [taskName, setTaskName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);
    let addTask = () => {
        if (taskName.trim() !== "") {
            props.addTasks(taskName.trim(), props.id);
            setTaskName("");
        } else {
            setError("Title is required")
        }
    }

    function onTaskNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value);
        setError("");
    }

    function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    function onAllClickHandler() {
        props.changeTodoListFilter('all', props.id);
    }

    function onActiveClickHandler() {
        props.changeTodoListFilter('active', props.id);
    }

    function onCompletedClickHandler() {
        props.changeTodoListFilter('completed', props.id);
    }

    function onClickRemoveTodoList() {
            props.removeTodoList(props.id);
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={onClickRemoveTodoList}>x</button>
            </h3>

            <div>
                <input
                    className={error ? "error" : ""}
                    type={'text'}
                    value={taskName}
                    onChange={onTaskNameChanged}
                    onKeyPress={onAddTaskKeyPressed}

                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((task) => {
                    let removeTask = () => {
                        props.removeTask(task.id, props.id)
                    }
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = e.currentTarget.checked;
                        props.changeTaskStatus(task.id, newCheckBoxValue, props.id);
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "isDone" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeStatus}
                            />
                            <span>{task.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={`btn ${(props.filterValue === "all") ? "active" : ""}`}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={`btn ${(props.filterValue === "active") ? "active" : ""}`}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={`btn ${(props.filterValue === "completed") ? "active" : ""}`}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>

    );
}