import React from 'react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1


export default {
    title: 'Todolist/AppWithReduxStories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExamples = (props: any) => {
    return <AppWithRedux/>
}



