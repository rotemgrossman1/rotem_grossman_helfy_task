const tasks = [
    {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
    }
]

async function getAllTasks(){
    return await Promise.resolve(tasks);//
}

async function createTask(body){
    tasks.push({
        id: tasks.length + 1,
        title: body.title,
        description: body.description,
        completed: false,
        createdAt: new Date(),
        priority: body.priority || 'medium'
    });
    return await Promise.resolve(tasks[tasks.length - 1]);
}
function findTaskById(id) {
    try{
        return tasks.find(task => task.id === parseInt(id));
    } catch (error) {
        console.error('Error finding task by ID:', error);
        throw error;
    }
}
async function updateTask(id, body){
    const task = findTaskById(id);
    if (task) {
        task.title = body.title || task.title;
        task.description = body.description || task.description;
        task.priority = body.priority || task.priority;
        return await Promise.resolve(task);
    }else{
        return null;
    }
}
async function deleteTask(id, body){
    const task = findTaskById(id);
    if (task) {
        tasks.splice(tasks.indexOf(task), 1);
        return await Promise.resolve(task);
    }else{
        return null;
    }
}
async function toggleTaskCompletion(id){
    const task = findTaskById(id);
    if (task) {
        task.completed = !task.completed;
        return await Promise.resolve(task);
    }else{
        return null;
    }
}
