exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('votes').insert([
    { id: 1, user_id: 1, joke_id: 1, vote: 1 },
    { id: 2, user_id: 1, joke_id: 2, vote: -1 }
  ]);
};
