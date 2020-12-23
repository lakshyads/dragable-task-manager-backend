const mongoose = require('mongoose');

/** Asynchronously connect with mongo DB */
const connectDB = async () => {
  const mongoURI =
    process.env.MONGO_URI || 'mongodb://localhost:27017/task_manager';
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected.');
  } catch (error) {
    console.log({
      error: 'MongoDB connection failed.',
      message: error.message,
    });
  }
};

module.exports = connectDB;
