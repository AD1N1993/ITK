

import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
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
        <Task task={{id:"1",isDone: true, title:"HTML"}}
                   removeTask={removeTask}
                   changeStatus={changeStatus}
                   changeTaskTitle={changeTaskTitle}
    />  <Task task={{id:"1",isDone: false, title:"CSS"}}
                   removeTask={removeTask}
                   changeStatus={changeStatus}
                   changeTaskTitle={changeTaskTitle}
    /></div>)
}
