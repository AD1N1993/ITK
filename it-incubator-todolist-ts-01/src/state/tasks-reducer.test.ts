import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {AddTodoListAC} from './todolists-reducer';
import {TaskStatuses, TodoTaskPriorities} from "../api/todolist-api";

let startState: TasksStateType
beforeEach(()=>{
   startState = {
        "todolistId1": [
            {id: "1", title: 'HTML', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todoListID1" },
            {id: "2", title: 'CSS', status: TaskStatuses.New,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todoListID1" },
            {id: "3", title: 'JS', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todoListID1" },
        ],
        "todolistId2": [
            {id: "1", title: 'React', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId2" },
            {id: "2", title: 'Angular', status: TaskStatuses.New,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId2" },
            {id: "3", title: 'Vue', status: TaskStatuses.Completed,addedDate:"",deadline:"", description:"",
                priority: TodoTaskPriorities.Low, order:2, startDate:"",  todoListId: "todolistId2" },
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = removeTasksAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC("juce","todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.Completed, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState[ "todolistId2"][1].status).toBe(TaskStatuses.Completed);
    expect(endState[ "todolistId1"][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {


    const action = changeTaskTitleAC("2", "beer", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState[ "todolistId2"][1].title).toBe("beer");
    expect(endState[ "todolistId1"][1].title).toBe("CSS");
});


test('new array should be added when new todolist is added', () => {


    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});









