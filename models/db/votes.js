const db = require('../index.js');

module.exports = {
  find,
  edit,
  create,
  remove
};

function find(filter) {
  return filter
    ? db('votes as v')
        .select('v.id as id', 'u.username as username', 'v.vote as vote')
        .where(filter)
        .join('users as u', { 'v.user_id': 'u.id' })
        .join('jokes as j', { 'v.joke_id': 'j.id' })
    : db('votes as v')
        .select('v.id as id', 'u.email as email')
        .join('users as u', { 'v.user_id': 'u.id' })
        .join('jokes as j', { 'v.joke_id': 'j.id' });
}

function edit(filter, newInfo) {
  return db('votes')
    .where(filter)
    .update(newInfo)
    .then(_ =>
      find({ 'v.user_id': filter.user_id, 'v.joke_id': filter.joke_id }).first()
    );
}

function create(newVote) {
  return db('votes')
    .insert(newVote, ['*'])
    .then(v => find({ 'v.id': v[0].id }).first());
}

function remove(id) {
  return db('votes')
    .where({ id })
    .delete();
}
