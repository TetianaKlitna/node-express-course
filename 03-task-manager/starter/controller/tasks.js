const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(200).json(tasks);
};

const createTask = async (req, res) => {
  try {
    const name = req.body.name;
    if(!name){
      return res.status(400).json({success: false, error: 'Task name is required.'});
    }
    let completed = req.body?.completed || false;
    const task = await Task.create({ name, completed });
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(`Error during create task ${req.body}: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getTask = (req, res) => {
  Task.get;
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
