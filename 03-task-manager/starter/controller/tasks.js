const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(`Error during fetching  ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { name, completed } = req.body;
    const task = await Task.create({ name, completed });
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(`Error during creating a task ${req.body}`);
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTask = async (req, res) => {
  const { id: taskID } = req.params;
  if (!taskID || taskID.trim() === '') {
    return res
      .status(400)
      .json({ success: false, error: 'Task ID is required.' });
  }
  try {
    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with ID: ${taskID} is not found`,
      });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(`Error during getting the task with ID: ${taskID}`);
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id: TaskID } = req.params;
  if (!TaskID) {
    return res
      .status(400)
      .json({ success: false, error: 'Task id is required.' });
  }
  const { name, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, error: 'Task is not found' });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(`Error during updating the task with id: ${id} ${req.body}`);
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    if (!taskID || taskID.trim() === '') {
      return res
        .status(400)
        .json({ success: false, error: 'Task ID is required.' });
    }
    const task = await Task.findByIdAndDelete(taskID);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task with ID: ${taskID} is not found.`,
      });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(`Error during deleteting the task with ID: ${taskID}`);
    console.error(error);
    res.status(500).json({ success: error, error: error.message });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
