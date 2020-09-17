import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '2c4c11b3-b7ca-4a85-9ffe-5b500c4db141'
    }
});

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}



type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export const todolistAPI = {
    getTodoLists() {
        return instance.get<Array<TodolistType>>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>("todo-lists", {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    },
    createTask(todolistId:string,title:string){
        return instance.post(`todo-lists/${todolistId}/tasks`,{title})
    }
}
