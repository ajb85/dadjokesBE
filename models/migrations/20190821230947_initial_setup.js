exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl
        .text('email')
        .notNullable()
        .unique();
      tbl
        .text('username')
        .notNullable()
        .unique();
      tbl.text('password').notNullable();
      tbl.text('first_name');
      tbl.text('last_name');
      tbl.integer('age');
    })
    .createTable('jokes', tbl => {
      tbl.increments();
      tbl
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      tbl.text('setup').notNullable();
      tbl.text('punchline').notNullable();
      tbl.boolean('isPublic').notNullable();
    })
    .createTable('favorites', tbl => {
      tbl.increments();
      tbl
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      tbl
        .integer('joke_id')
        .references('id')
        .inTable('jokes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
    })
    .createTable('votes', tbl => {
      tbl.increments();
      tbl
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      tbl
        .integer('joke_id')
        .references('id')
        .inTable('jokes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      tbl.integer('vote').notNullable();
    });
};

exports.down = function(knex) {};
