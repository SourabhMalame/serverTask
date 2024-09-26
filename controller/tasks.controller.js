const Task = require('../Model/task.model'); // Assuming you have a Task model defined

// controller/task.controller.js
exports.addTask = async (req, res) => {
    const { title, description, status, startDate, endDate, category } = req.body;
    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    const newTask = {
        userId,
        title,
        description,
        status,
        startDate,
        endDate,
        category,
    };

    try {
        const createdTask = await Task.create(newTask); // Assuming Task is your Mongoose model
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch tasks associated with the user
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findOne({ _id: taskId, userId: req.user.id }); // Check if the task belongs to the user
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a specific task by ID
exports.updateTask = async (req, res) => {
    const taskId = req.params.taskId;
    const updates = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: taskId }, // Ensure the task belongs to the user
            updates,
            { new: true } // Return the updated task
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a specific task by ID
exports.deleteTask = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findOneAndDelete({ _id: taskId}); // Ensure the task belongs to the user

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

