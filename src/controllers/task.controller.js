const Task = require('../models/task.model');

/**
 * Create Task
 * @param {*} req should contain body.name
 * @param {*} res
 */
exports.create = async (req, res) => {
  if (!req.body.title || req.body.title === '')
    return res.status(400).send({
      status: 'Invalid request',
      message: `Field 'title' cannot be empty.`,
    });
  if (!req.body.user || req.body.user === '')
    return res.status(400).send({
      status: 'Invalid request',
      message: `Field 'user' cannot be empty.`,
    });
  const task = new Task(req.body);
  try {
    const data = await task.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Find all Tasks
 * @param {*} req
 * @param {*} res
 */
exports.findAll = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Update Task
 * @param {*} req body should contain valid Task id and title
 * @param {*} res
 */
exports.update = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).send({
        status: 'Failed',
        message: `Task not found with id ${req.body._id}`,
      });
    }

    res.status(201).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Delete Task
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.body._id });

    if (!task) {
      return res.status(404).send({
        status: 'Failed',
        message: `Task not found with id ${req.body._id}`,
      });
    }

    res.status(201).send({ message: 'Task deleted successfully!', task: task });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
