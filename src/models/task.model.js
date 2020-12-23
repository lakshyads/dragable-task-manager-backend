const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title can not be empty'],
    },
    description: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Associated user can not be empty'],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Task', TaskSchema);
