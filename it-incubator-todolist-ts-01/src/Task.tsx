import React, {MouseEvent, ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithReducer";


type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeStatus: (taskId: string, newCheckBoxValue: boolean) => void
    changeTaskTitle:(taskId: string,newTitle:string)=> void
}


export const Task = React.memo((props: TaskPropsType) => {
        let removeTask =useCallback( (id: string) => {
            props.removeTask(id)
        },[props]);
        let changeStatus =useCallback( (e: ChangeEvent<HTMLInputElement>) => {
            let newCheckBoxValue = e.currentTarget.checked;

            props.changeStatus(props.task.id, newCheckBoxValue);
        },[props]);
        let changeTaskTitle =useCallback( (newTitle:string) => {
            props.changeTaskTitle(props.task.id, newTitle)
        },[props])
        return (
            <>
                <div key={props.task.id} className={props.task.isDone ? "isDone" : ""}>
                    <Checkbox
                        checked={props.task.isDone}
                        onChange={(e)=>{changeStatus(e)}}
                        color={"primary"}
                    />
                    <EditableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
                    <IconButton aria-label="delete" onClick={(e) => {
                        removeTask(props.task.id)
                    }}>
                        <Delete/>
                    </IconButton>
                    {/*<button onClick={removeTask}>x</button>*/}
                </div>
            </>
        );
    }
)