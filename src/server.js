// import modules
const express = require('express');
const cors = require('cors');

// configure app
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors()); // Configure cross-origin requesting rules

/** Added a nifty lil middleware for request logging ;) */
server.use((req, res, next) => {
  console.log(`${req.method} ${req.path} ${res.statusCode}`);
  console.log(`${JSON.stringify(req.body)}`);
  next();
});

// configure DB
require('./utils/db.utils')();

// configure routes
server.get('/', (req, res) => {
  res.status(200).send({
    path: '/',
    status: 'OK',
    availableRoutes: [
      {
        path: '/taskmanager/api/v1',
        apiVersion: 'v1',
        status: 'OK',
        availableRoutes: [
          { path: '/user', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
          { path: '/task', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        ],
      },
    ],
  });
});
server.use('/taskmanager/api/v1', require('./routes/routes'));

// start server
const port = process.env.PORT || 3002;
server.listen(port, () => console.log(`Server is running on port ${port}`));
