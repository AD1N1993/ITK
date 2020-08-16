import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

                <IconButton onClick={onClickRemoveTodoList}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
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
                        <div key={task.id} className={task.isDone ? "isDone" : ""}>
                            <Checkbox
                                checked={task.isDone}
                                onChange={changeStatus}
                                color={"primary"}
                            />
                            <EditableSpan title={task.title} saveNewTitle={changeTaskTitle}/>
                            <IconButton aria-label="delete" onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                            {/*<button onClick={removeTask}>x</button>*/}
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={ "contained"}
                        color={(props.filterValue === "all") ? "secondary" : "primary"}
                        onClick={onAllClickHandler}
                        size={"small"}>
                    All
                </Button>
                <Button variant={ "contained"}
                        color={(props.filterValue === "active") ? "secondary" : "primary"}
                        onClick={onActiveClickHandler}
                        size={"small"}>
                    Active
                </Button>
                <Button variant={ "contained"}
                        color={(props.filterValue === "completed") ? "secondary" : "primary"}
                        onClick={onCompletedClickHandler}
                        size={"small"}>
                    Completed
                </Button>
            </div>
        </div>

    );
}