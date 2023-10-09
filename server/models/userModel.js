const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SALT_WORK_FACTOR = 10;

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next({
        log: `userSchema: ERROR: ${err}`,
        message: {
          err: 'Error in userSchema. We could not hash the password!',
        },
        status: 400,
      });
    }
    this.password = hash;
    return next();
  });
});

const User = mongoose.model('users', userSchema);

module.exports = {
  User,
};
