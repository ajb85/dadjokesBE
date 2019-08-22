const bcrypt = require('bcrypt');
exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('users').insert([
    {
      id: 1,
      first_name: 'Joe',
      last_name: 'Somebody',
      age: 34,
      email: 'superreal@email.address',
      password: bcrypt.hashSync('asdf', 10)
    }
  ]);
};
