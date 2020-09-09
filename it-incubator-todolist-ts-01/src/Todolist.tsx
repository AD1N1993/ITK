import React, {ChangeEvent, useCallback, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsType = {
    tlId: string
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

export const TodoList = React.memo((props: PropsType) => {



    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter('all', props.tlId);
    }, [props.changeTodoListFilter,props.tlId]);

    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter('active', props.tlId);
    }, [props.changeTodoListFilter,props.tlId]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter('completed', props.tlId);
    }, [props.changeTodoListFilter,props.tlId]);

    function onClickRemoveTodoList() {
        props.removeTodoList(props.tlId);
    }

    const addTask = useCallback((title: string) => {
        props.addTasks(title, props.tlId)
    }, [props]);


    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.tlId, newTitle);
    }

    let tasksForTodoList = props.tasks

    if (props.filterValue === "active") {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }

    if (props.filterValue === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }
    let removeTask = useCallback( (taskId:string) => {
        props.removeTask(taskId, props.tlId)
    },[props]);
    let changeStatus =useCallback( (taskId: string, newCheckBoxValue: boolean) => {
        props.changeTaskStatus(taskId, newCheckBoxValue, props.tlId);
    },[props])

    let changeTaskTitle =useCallback( (taskId:string,newTitle: string) => {
        props.changeTaskTitle(taskId, newTitle, props.tlId)
    },[props])
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>

                <IconButton onClick={onClickRemoveTodoList}><Delete/></IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodoList.map((task) => {


                    return (
                       <Task task={task}
                             removeTask={removeTask}
                             changeStatus={changeStatus}
                             changeTaskTitle={changeTaskTitle}
                       />
                    )
                })}
            </div>
            <div>
                <Button variant={"contained"}
                        color={(props.filterValue === "all") ? "secondary" : "primary"}
                        onClick={onAllClickHandler}
                        size={"small"}>
                    All
                </Button>
                <Button variant={"contained"}
                        color={(props.filterValue === "active") ? "secondary" : "primary"}
                        onClick={onActiveClickHandler}
                        size={"small"}>
                    Active
                </Button>
                <Button variant={"contained"}
                        color={(props.filterValue === "completed") ? "secondary" : "primary"}
                        onClick={onCompletedClickHandler}
                        size={"small"}>
                    Completed
                </Button>
            </div>
        </div>

    );
})