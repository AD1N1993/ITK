

import React from 'react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1


export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
}

export const AddItemFormsBaseExamples = (props:any)=>{
    return (<AddItemForm addItem={action("Button inside form clicked")}/>)
}
