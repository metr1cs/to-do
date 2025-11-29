
import { fetchTasks, addTask, updateTask, deleteTask } from './api.js';

let tasks = [];

export function getTasks() {
    return tasks;
}

export async function fetchAndSetTasks() {
    const loadedTasks = await fetchTasks();
    tasks = loadedTasks;
}

// 1. Добавление (CREATE)
export async function addTaskRemote(text){
    const newTask = await addTask(text);
    tasks.push(newTask);
}
