const router = require('express').Router();
const userController = require('../controllers/user.controller');
const taskController = require('../controllers/task.controller');

// Home route
router.get('/', (req, res) => {
  res.status(200).send({
    path: '/taskmanager/api/v1',
    apiVersion: 'v1',
    status: 'OK',
    availableRoutes: [
      { path: '/user', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
      { path: '/task', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
    ],
  });
});
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
