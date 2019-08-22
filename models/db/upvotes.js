const db = require('../index.js');

module.exports = {
  find,
  edit,
  create,
  remove
};

async function find(filter) {
  // Transaction?
  if (filter) {
    return await db('votes as v')
      .select('v.id as id', 'u.email as email')
      .where(filter)
      .join('user as u', { 'v.user_id': 'u.id' })
      .join('jokes as j', { 'v.joke_id': 'j.id' });
    // const downvotes = await db('votes as v')
    //   .select('v.id as id', 'u.email as email')
    //   .where({ ...filter, score: -1 })
    //   .join('user as u', { 'f.user_id': 'u.id' })
    //   .join('jokes as j', { 'f.joke_id': 'v.id' });
    // return { upvotes, downvotes };
  }
  return await db('votes as v')
    .select('v.id as id', 'u.email as email')
    .where(filter)
    .join('user as u', { 'v.user_id': 'u.id' })
    .join('jokes as j', { 'v.joke_id': 'j.id' });
  //   const downvotes = await db('votes as v')
  //     .select('v.id as id', 'u.email as email')
  //     .where({ score: -1 })
  //     .join('user as u', { 'f.user_id': 'u.id' })
  //     .join('jokes as j', { 'f.joke_id': 'v.id' });
  //   return { upvotes, downvotes };
}

function edit(filter, newInfo) {
  return db('votes')
    .where(filter)
    .update(newInfo)
    .then(f => find({ id: f[0].id }).first());
}

function create(newVote) {
  return db('votes')
    .insert(newVote, ['*'])
    .then(f => find({ id: f[0].id }).first());
}

function remove(id) {
  return db('votes')
    .where({ id })
    .delete();
}
