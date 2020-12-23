const User = require('../models/user.model');

/**
 * Create User
 * @param {*} req should contain body.name
 * @param {*} res
 */
exports.create = async (req, res) => {
  if (!req.body.name || req.body.name === '')
    return res.status(500).send({
      status: 'Create Failed',
      message: `Field 'userName' cannot be empty.`,
    });
  const user = new User(req.body);
  try {
    const data = await user.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Find all users
 * @param {*} req
 * @param {*} res
 */
exports.findAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Update user
 * @param {*} req body should contain valid user id and name
 * @param {*} res
 */
exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({
        status: 'Failed',
        message: `User not found with id ${req.body._id}`,
      });
    }

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * Delete User
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.body._id });

    if (!user) {
      return res.status(404).send({
        status: 'Failed',
        message: `User not found with id ${req.body._id}`,
      });
    }

    res.status(201).send({ message: 'User deleted successfully!', user: user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
