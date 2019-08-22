exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.text('first_name').notNullable();
      tbl.text('last_name').notNullable();
      tbl.integer('age');
      tbl.text('email').notNullable();
      tbl.text('password').notNullable();
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
    .createTable('upvotes', tbl => {
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
      tbl.integer('score').notNullable();
    });
};

exports.down = function(knex) {};
