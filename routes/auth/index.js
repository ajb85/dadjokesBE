const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../../models/db/users');
const generateToken = require('../../config/generateToken.js');
const { verifyAccountInfo } = require('../../middleware/accounts.js');
const { isValidEmail } = require('../../config/inputEvaluation.js');

router.post('/accounts', verifyAccountInfo, async (req, res) => {
  const { username, email, account, password } = res.locals.user;
  /* REGISTER NEW ACCOUNT */
  if (username && email) {
    const usernameExists = await Users.find({ username }).first();
    const emailExists = await Users.find({ email }).first();
    if (usernameExists || emailExists) {
      return res
        .status(400)
        .json({ message: 'Username or email already in use' });
    }
    const { first_name, last_name, age } = res.locals.user;
    const newUser = {
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      first_name,
      last_name,
      age
    };
    const new_account = await Users.create(newUser);
    delete new_account.password;
    res.status(201).json({ new_account, token: generateToken(new_account) });

    /* LOGIN TO EXISTING ACCOUNT */
  } else if (account) {
    const key = isValidEmail(account) ? 'u.email' : 'u.username';
    const user = await Users.find({ [key]: account }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        message: `Login successful!`,
        token: generateToken(user)
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  }
});

module.exports = router;
