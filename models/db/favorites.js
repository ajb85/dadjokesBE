const db = require('../index.js');

module.exports = {
  find,
  toggle,
  create
};

function find(filter) {
  if (filter) {
    return db('favorites as f')
      .select('f.id as favorite_id', 'j.id as id')
      .where(filter)
      .join('user as u', { 'f.user_id': 'u.id' })
      .join('jokes as j', { 'f.joke_id': 'j.id' });
  }
  return db('favorites as f')
    .select('j.id as id')
    .where(filter)
    .join('user as u', { 'f.user_id': 'u.id' })
    .join('jokes as j', { 'f.joke_id': 'j.id' });
}

async function toggle(filter) {
  const isFavorite = await find(filter).first();
  if (isFavorite) {
    return remove(isFavorite.favorite_id);
  } else {
    return create(filter);
  }
}

function create(newFav) {
  return db('favorites')
    .insert(newFav, ['*'])
    .then(f => find({ id: f[0].id }).first());
}

function remove(id) {
  return db('favorites')
    .where({ id })
    .delete();
}
