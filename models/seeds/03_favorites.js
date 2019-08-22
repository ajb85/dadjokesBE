exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('favorites').insert([{ id: 1, user_id: 1, joke_id: 1 }]);
};
