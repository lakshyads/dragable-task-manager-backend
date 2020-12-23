const router = require('express').Router();
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');

// User routes
router
  .route('/user')
  .get(userController.findAll)
  .post(userController.create)
  .patch(userController.update)
  .delete(userController.delete);

// Task routes
router
  .route('/task')
  .get(taskController.findAll)
  .post(taskController.create)
  .patch(taskController.update)
  .delete(taskController.delete);

module.exports = router;
