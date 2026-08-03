const express = require('express');
const controller = require('../controllers/taskController');
const router = express.Router()

router.get('/api/tasks', controller.getAllTasks);
router.post('/api/tasks', controller.createTask);
router.put('/api/tasks/:id', controller.updateTask);
router.delete('/api/tasks/:id', controller.deleteTask);
router.patch('/api/tasks/:id/toggle', controller.toggleTaskCompletion);

module.exports = router;