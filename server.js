const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const errorHandler = require('./middleware/errorHandling.js');
// Routes
const authRouter = require('./routes/auth/');
// const usersRouter = require('./routes/users/');
// const jokesRouter = require('./routes/jokes/');
// const favoritesRouter = require('./routes/favorites/');
// const upvotesRouter = require('./routes/upvotes/');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
// server.use('/api/users', usersRouter);
// server.use('/api/jokes', jokesRouter);
// server.use('/api/favorites', favoritesRouter);
// server.use('/api/upvotes', upvotesRouter);

server.get('/', (req, res) => {
  res.send("It's working!");
});

//async error handling middleware MUST come after routes or else will just throw Type error
server.use(errorHandler);

module.exports = server;
