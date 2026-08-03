const models = require('../models/taskModels');

async function getAllTasks(req, res) {
    try {
    const tasks = await models.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
}

async function createTask(req, res) {
    try {
        const newTask = await models.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
}

async function updateTask(req, res) {
    try {
        const updatedTask = await models.updateTask(req.params.id, req.body);
        if (updatedTask) {
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
}

async function deleteTask(req, res) {
    try {
        const deletedTask = await models.deleteTask(req.params.id);
        if (deletedTask) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
}

async function toggleTaskCompletion(req, res) {
    try {
        const toggledTask = await models.toggleTaskCompletion(req.params.id);
        if(toggledTask){
            res.status(200).json(toggledTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error toggling task completion' });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
};