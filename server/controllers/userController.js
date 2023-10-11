const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {
  // get all users
  // GET
  async getAllUsers(req, res, next) {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      next({
        log: `getAllUsers: ERROR: ${err}`,
        message: {
          err: 'We cannot get users',
        },
        status: 500,
      });
    }
  },

  // create a new user
  // POST

  async createUser(req, res, next) {
    const { username, password } = req.body;

    try {
      const newUser = await User.create({ username, password });
      return res.status(201).json(newUser);
    } catch (err) {
      next({
        log: `createUser: ERROR: ${err}`,
        message: {
          err: 'We cannot create a new user',
        },
        status: 400,
      });
    }
  },

  // get a user
  // GET

  async getUser(req, res, next) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User was not found' });
      }
      return res.status(200).json(user);
    } catch (err) {
      next({
        log: `getUser: ERROR: ${err}`,
        message: {
          err: 'We could not get the user',
        },
        status: 500,
      });
    }
  },

  // update a user
  // PUT

  async updateUser(req, res, next) {
    const { userId } = req.params;
    const { username, password } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, password },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User was not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (err) {
      next({
        log: `updateUser: ERROR: ${err}`,
        message: {
          err: 'We could not update the user',
        },
        status: 400,
      });
    }
  },

  // delete a user
  // DELETE

  async deleteUser(req, res, next) {
    const { userId } = req.params;

    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User was not found' });
      }
      return res.status(204).send();
    } catch (err) {
      next({
        log: `deleteUser: ERROR: ${err}`,
        message: {
          err: 'We could not delete the user',
        },
        status: 500,
      });
    }
  },
};

module.exports = userController;
