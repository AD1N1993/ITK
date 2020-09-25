import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TaskStatuses, TodoTaskPriorities} from "../api/todolist-api";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    taskID: string
    todoListID: string
    status: TaskStatuses
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    todoListID: string
    title: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

let initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let newTodoList = [...state[action.todoListId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todoListId]: newTodoList}
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, status: TaskStatuses.New,addedDate:"",deadline:"", description:"",
                    priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: action.todoListID }

            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
        case "CHANGE-STATUS":
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    debugger
                    if (task.id === action.taskID) {
                        return {...task, status: action.status}
                    } else {
                        return task
                    }
                })
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
           return state;
    }
}

export const removeTasksAC = (taskId: string, todoListId: string): ActionsType => {
    return {type: "REMOVE-TASK", taskId, todoListId}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ActionsType => {
    return {type: "CHANGE-STATUS", taskID, status, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ActionsType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListID}
}

export const addTaskAC = (title: string, todoListID: string): ActionsType => {
    return {type: 'ADD-TASK', title, todoListID};
}


