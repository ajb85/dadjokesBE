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
        .select(
          'j.id AS id',
          'u.id AS user_id',
          'u.username AS creator',
          'j.setup AS setup',
          'j.punchline AS punchline',
          'j.isPublic AS isPublic'
        )
        .count('f.joke_id AS favorites')
        .count('up.joke_id AS upvotes')
        .count('down.joke_id AS downvotes')
        .join('users AS u', { 'j.user_id': 'u.id' })
        .leftJoin('favorites AS f', { 'f.joke_id': 'j.id' })
        .leftJoin('votes AS up', { 'up.joke_id': 'j.id', 'up.vote': 1 })
        .leftJoin('votes AS down', { 'down.joke_id': 'j.id', 'down.vote': -1 })
        .groupBy('j.id', 'u.id')
        .where(filter)
    : db('jokes AS j')
        .select(
          'j.id AS id',
          'u.id AS user_id',
          'u.username AS creator',
          'j.setup AS setup',
          'j.punchline AS punchline',
          'j.isPublic AS isPublic'
        )
        .count('f.joke_id AS favorites')
        .count('up.joke_id AS upvotes')
        .count('down.joke_id AS downvotes')
        .join('users AS u', { 'j.user_id': 'u.id' })
        .leftJoin('favorites AS f', { 'f.joke_id': 'j.id' })
        .leftJoin('votes AS up', { 'up.joke_id': 'j.id', 'up.vote': 1 })
        .leftJoin('votes AS down', { 'down.joke_id': 'j.id', 'down.vote': -1 })
        .groupBy('j.id', 'u.id');
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
