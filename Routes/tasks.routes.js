const express = require('express');
const {
    addTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controller/tasks.controller'); // Make sure these functions are defined in your controller

const router = express.Router();

// Route to create a new task
router.post('/:id', addTask);

// Route to get all tasks
router.get('/', getTasks);

// Route to get a task by ID
router.get('/:taskId', getTaskById);

// Route to update a task by ID
router.put('/:taskId', updateTask);

// Route to delete a task by ID
router.delete('/:taskId', deleteTask);



module.exports = router;
