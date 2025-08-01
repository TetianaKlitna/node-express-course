const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(`Error during fetching  ${error}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: 'Task name is required.' });
    }
    let completed = req.body?.completed || false;

    const task = await Task.create({ name, completed });
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(`Error during creating a task ${req.body}`);
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTask = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: 'Task id is required.' });
  }
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, error: 'Task is not found' });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(`Error during getting the task with id: ${id}`);
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: 'Task id is required.' });
  }
  const { name, completed } = req.body;
  if (name === undefined && completed === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Please provide at least one field: name or completed',
    });
  }
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, error: 'Task is not found' });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error('Error during updating the task with id: ${id} ${req.body}');
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: 'Task id is required.' });
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, error: 'Task is not found.' });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(`Error during deleteting the task with id: ${id}`);
    console.error(error);
    res.status(500).json({ success: error, error: error.message });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
