const db = require('../index.js');

module.exports = {
  find,
  edit,
  create,
  remove
};

function find(filter) {
  if (filter) {
    return db('jokes AS j')
      .select(
        'j.id AS id',
        'u.username AS creator',
        'j.setup AS setup',
        'j.punchline AS punchline',
        'j.isPublic AS isPublic'
      )
      .where(filter)
      .join('users AS u', { 'j.user_id': 'u.id' });
  }
  return db('jokes AS j')
    .select(
      'j.id AS id',
      'u.email AS creator',
      'j.setup AS setup',
      'j.punchline AS punchline',
      'j.isPublic AS isPublic'
    )
    .where(filter)
    .join('users AS u', { 'j.user_id': 'u.id' });
}

function edit(filter, newInfo) {
  db('jokes')
    .where(filter)
    .update(newInfo)
    .then(j => find({ 'j.id': j[0].id }).first());
}

function create(newJoke) {
  return db('jokes')
    .insert(newJoke, ['*'])
    .then(j => find({ id: j[0].id }).first());
}

function remove(filter) {
  return db('jokes')
    .where(filter)
    .delete();
}
