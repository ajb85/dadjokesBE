require('dotenv').config();
require('express-async-errors');
const server = require('./server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} ** \n`));
