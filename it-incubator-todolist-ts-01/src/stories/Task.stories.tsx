

import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {v1} from "uuid";
import {TaskStatuses, TodoTaskPriorities} from "../api/todolist-api";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1


export default {
    title: 'Todolist/Task',
    component: Task,
}

 let removeTask = action("Remove Button inside Task click");

let changeStatus=  action("Status changed inside Task click");


let changeTaskTitle=  action("Title change inside Task click");


export const TaskBaseExamples = (props:any)=>{
    return ( <div>
        <Task task={ {id: v1(), title: 'HTML', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
            priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId1" }}
                   removeTask={removeTask}
                   changeStatus={changeStatus}
                   changeTaskTitle={changeTaskTitle}
    />  <Task task={ {id: v1(), title: 'CSS', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
        priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId1" }}
                   removeTask={removeTask}
                   changeStatus={changeStatus}
                   changeTaskTitle={changeTaskTitle}
    /></div>)
}
