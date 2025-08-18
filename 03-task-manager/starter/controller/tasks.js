const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res
    .status(200)
    .json({ success: true, tasks, amount: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  if (!taskID || taskID.trim() === '') {
    return next(createCustomError(400, 'Task ID is required.'));
  }
  const task = await Task.findById(taskID);
  if (!task) {
    return next(createCustomError(404, `Task with ID: ${taskID} is not found`));
  }
  res.status(200).json({ success: true, task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  if (!taskID || taskID.trim() === '') {
    return next(createCustomError(400, 'Task ID is required.'));
  }
  const task = await Task.findByIdAndUpdate(taskID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(404, `Task with ID: ${taskID} is not found`));
  }
  res.status(200).json({ success: true, task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  if (!taskID || taskID.trim() === '') {
    return next(createCustomError(400, 'Task ID is required.'));
  }
  const task = await Task.findByIdAndDelete(taskID);
  if (!task) {
    return next(createCustomError(404, `Task with ID: ${taskID} is not found`));
  }
  res.status(200).json({ success: true, task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
