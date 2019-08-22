const db = require('../index.js');

module.exports = {
  find,
  edit,
  create,
  remove
};

function find(filter) {
  if (filter) {
    return db('jokes as j')
      .select(
        'j.id as id',
        'u.email as creator',
        'j.setup as setup',
        'j.punchline as punchline',
        'j.isPublic as isPublic'
      )
      .where(filter)
      .join('user as u', { 'j.user_id': 'u.id' });
  }
  return db('jokes as j')
    .select(
      'j.id as id',
      'u.email as creator',
      'j.setup as setup',
      'j.punchline as punchline',
      'j.isPublic as isPublic'
    )
    .where(filter)
    .join('user as u', { 'j.user_id': 'u.id' });
}

function edit(filter, newInfo) {
  db('jokes')
    .where(filter)
    .update(newInfo)
    .then(j => find({ id: j[0].id }).first());
}

function create(newJoke) {
  return db('jokes')
    .insert(newJoke, ['*'])
    .then(j => find({ id: j[0].id }).first());
}

function remove(id) {
  return db('jokes')
    .where({ id })
    .delete();
}
