const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name can not be empty'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema);
