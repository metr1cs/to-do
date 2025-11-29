
const API_BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

export async function fetchTasks(){
    try{
        const response = await fetch(API_BASE_URL);
        if (!response.ok){
            throw new Error(`Имеется ошибка сети: ${response.status}`);
        }
        const data = await response.json();

        // Трансформация: title -> text и ограничение до 10 элементов
        return data.slice(0, 10).map(item => {
            return {
                id: item.id,
                text: item.title,
                completed: item.completed,
            }
        });

    }catch (error){
        console.error('Error fetching data:', error);
        return [];
    }
}

export async function addTask(text){
    const newTaskText = {
        title: text,
        completed: false,
        userId: 1,
    }

    const response = await fetch(API_BASE_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskText),
    })

    if (!response.ok){
        throw new Error('не удалось добавить задачу на сервер')
    }

    const createdTask = await response.json();
    return {
        id: createdTask.id,
        text: createdTask.title,
        completed: createdTask.completed
    };
}

export async function updateTask(id, completedStatus){
    const response = await fetch(`${API_BASE_URL}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: completedStatus }),
    })
    if (!response.ok) {
        throw new Error(`Не удалось обновить задачу ${id}`);
    }
    return response.json();
}

export async function deleteTask(id){
    const response = await fetch(`${API_BASE_URL}/${id}`,{
        method: 'DELETE',
    })

    if (!response.ok){
        throw new Error(`Не удалось удалить задачу ${id}`)
    }

}