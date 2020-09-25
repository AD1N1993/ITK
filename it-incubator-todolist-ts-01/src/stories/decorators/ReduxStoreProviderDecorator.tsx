import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {AppRootStateType} from "../../state/store";
import {TaskStatuses, TodoTaskPriorities} from "../../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn?", filter: "all", addedDate:"", order:0},
        {id: "todolistId2", title: "What to Buy?", filter: "active",addedDate:"", order:1},
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: 'HTML', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId1" },
            {id: v1(), title: 'CSS', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId1" },
            {id: v1(), title: 'JS', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId1" },
        ],
        ["todolistId2"]: [
            {id: v1(), title: 'React', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId2" },
            {id: v1(), title: 'Angular', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId2" },
            {id: v1(), title: 'Vue', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId2" },
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

