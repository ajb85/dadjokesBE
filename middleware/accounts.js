const {
  isValidEmail,
  isValidUsername
} = require('../config/inputEvaluation.js');

module.exports = { parseInput, verifyAccountInfo };

function parseInput(req, res, next) {
  res.locals.user = {};
  res.locals.user.username = req.body.username
    ? req.body.username.toLowerCase()
    : null;
  res.locals.user.email = req.body.email ? req.body.email.toLowerCase() : null;
  res.locals.user.password = req.body.password;
  res.locals.user.account = req.body.account
    ? req.body.account.toLowerCase()
    : null;
  res.locals.user.first_name = req.body.first_name || null;
  res.locals.user.last_name = req.body.last_name || null;
  res.locals.user.age = parseInt(req.body.age) || null;
  if (next) next();
}

function verifyAccountInfo(req, res, next) {
  parseInput(req, res);
  const { username, email, password, account } = res.locals.user;

  if (email && password) {
    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (username && !isValidUsername(username)) {
      return res.status(400).json({
        message: 'Only alphanumeric characters allowed in a username'
      });
    }
  }
  password && ((username && email) || account)
    ? next()
    : res.status(400).json({
        message:
          'If registering, provide password, username, and email.  If logging in, include account and password'
      });
}
