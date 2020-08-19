import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    title: string
    todoListID:string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType


export const todolistsReducer = (state: Array<TodoListsType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodoListID = action.todoListID;
            let newTodolist: TodoListsType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            };
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state];
        // return state.map(tl=> tl.id === action.id ? {...tl,title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state];
        }
        default:
            throw new Error('error');
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todoListId}
}

export const AddTodoListAC = (newTitle: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: newTitle, todoListID:v1()}
}

export const ChangeTodoListTitleAC = (newTitle: string, tlId: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title: newTitle, id: tlId}
}
export const ChangeTodoListFilterAC = (newFilter: FilterValuesType, tlId: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: tlId}
}