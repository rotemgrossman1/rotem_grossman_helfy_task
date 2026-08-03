const express = require('express');
const controller = require('../controllers/taskControllers');
const router = express.Router()

router.get('/', controller.getAllTasks);
router.post('/', controller.createTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);
router.patch('/:id/toggle', controller.toggleTaskCompletion);

module.exports = router;