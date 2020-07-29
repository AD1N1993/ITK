import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (taskId: string, toDoListId: string) => void
    addTasks: (newTaskName: string, toDoListId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, toDoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, toDoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, toDoListId: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
    filterValue: FilterValuesType
    removeTodoList: (toDoListId: string) => void

}

export function TodoList(props: PropsType) {


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

    function addTask(title: string) {
        props.addTasks(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle);

    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
                <button onClick={onClickRemoveTodoList}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {
                    let removeTask = () => {
                        props.removeTask(task.id, props.id)
                    }
                    let changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = e.currentTarget.checked;
                        props.changeTaskStatus(task.id, newCheckBoxValue, props.id);
                    }
                    let changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(task.id, newTitle, props.id)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? "isDone" : ""}>
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={task.title} saveNewTitle={changeTaskTitle}/>
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