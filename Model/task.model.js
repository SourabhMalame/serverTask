const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, },
    description: { type: String, },
    status: { type: String, enum: ["Uncompleted", "Pending", "Completed"], default: "Uncompleted" },
    startDate: { type: Date, },
    endDate: { type: Date, },
    category: { type: String },
    userId: { type: String }
});

module.exports = mongoose.model("Task", taskSchema);
