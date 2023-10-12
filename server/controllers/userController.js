const { User } = require('../models/userModel');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken')

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

  // verify user
  //

  async verifyUser(req, res, next) {
    const { username, password } = req.body;
    try {
      if (!username.length || !password.length) {
        console.log(
          'Please include a username and a password in userController.verifyUser'
        );
      }

      const user = await User.findOne({ username });
      if (!user) {
        console.log('Login unsuccessful, please signup');
        return res
          .status(200)
          .json({ userNotFound: 'User was not found in the database' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        console.log('Login unsuccessful, please signup');
        return res.status(200).json({
          passwordIncorrect:
            'The entered password was incorrect. Please try again.',
        });
      }
      else {
        const subUser = user.toObject();
        const token = jwt.sign(subUser, 'spooky-key')
        res.cookie('token', token)
        res.send('Login successful')
        res.status(200)
      }
    } catch (err) {
      next({
        log: `verifyUser: ERROR: ${err}`,
        message: {
          err: 'We could not verify the user',
        },
        status: 500,
      });
    }
  },
//verify a user's JWT Token
  async verifyToken(req, res, next) {
    try {
      const token = req.cookies.token;
      console.log('token is: ' + token)
      if (!token) {
        //maybe redirect to register/login - this is just temporary
        return res.status(401).json({ message: 'Unauthorized' });
      }
      jwt.verify(token, 'spooky-key', (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        console.log('access granted')
        return next()
      })
    } catch (error) {
      
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
  }

}

module.exports = userController;
