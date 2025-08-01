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
    console.error(`Error during create task ${req.body}`);
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
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(`Error during get task with id: ${id}`);
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
