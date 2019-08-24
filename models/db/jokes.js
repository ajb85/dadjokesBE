const db = require('../index.js');

module.exports = {
  find,
  edit,
  create,
  remove
};

function find(filter) {
  return filter
    ? db('jokes AS j')
        // .count('t.* AS count')
        // .from(function() {
        //   this.select('*')
        //     .from('favorites AS f')
        //     .where({ 'f.joke_id': 'j.id' })
        //     .join('jokes AS j', { 'f.joke_id': 'j.id' })
        //     .as('t');
        // })
        .select(
          'j.id AS id',
          'u.id AS user_id',
          'u.username AS creator',
          'j.setup AS setup',
          'j.punchline AS punchline',
          'j.isPublic AS isPublic'
        )
        .where(filter)
        .join('users AS u', { 'j.user_id': 'u.id' })
    : db('jokes AS j')
        .count('f.id as favorites')
        .select(
          'j.id AS id',
          'u.email AS creator',
          'j.setup AS setup',
          'j.punchline AS punchline',
          'j.isPublic AS isPublic'
        )
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
    .then(j => find({ 'j.id': j[0].id }).first());
}

function remove(filter) {
  return db('jokes')
    .where(filter)
    .delete();
}
