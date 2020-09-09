import React from 'react';
import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1


export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
}


export const EditableSpanBaseExamples = (props: any) => {
    return (<div>
        <EditableSpan title={"StartValue"} saveNewTitle={action("ValueChange")}/>
    </div>)
}
