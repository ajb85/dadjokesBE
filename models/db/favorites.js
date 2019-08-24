const db = require('../index.js');

module.exports = {
  find,
  toggle
};

function find(filter) {
  return filter
    ? db('favorites AS f')
        .select(
          'f.id as id',
          'j.id AS joke_id',
          'j.setup AS setup',
          'j.punchline AS punchline',
          'j.isPublic as isPublic'
        )
        .where(filter)
        .join('users AS u', { 'f.user_id': 'u.id' })
        .join('jokes AS j', { 'f.joke_id': 'j.id' })
    : db('favorites AS f')
        .select(
          'f.id as id',
          'j.id AS joke_id',
          'j.setup AS setup',
          'j.punchline AS punchline',
          'j.isPublic as isPublic'
        )
        .join('users AS u', { 'f.user_id': 'u.id' })
        .join('jokes AS j', { 'f.joke_id': 'j.id' });
}

async function toggle(filter) {
  const isFavorite = await find({
    'f.user_id': filter.user_id,
    'f.joke_id': filter.joke_id
  }).first();
  return isFavorite ? remove({ id: isFavorite.id }) : create(filter);
}

function create(newFav) {
  return db('favorites')
    .insert(newFav, ['*'])
    .then(f => find({ 'f.id': f[0].id }).first());
}

function remove(filter) {
  return db('favorites')
    .where(filter)
    .delete();
}
