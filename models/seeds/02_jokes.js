exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('jokes').insert([
    {
      id: 1,
      user_id: 1,
      setup:
        "Today, my son asked 'Can I have a book mark?' and I burst into tears.",
      punchline: "11 years old and he still doesn't know my name is Joe.",
      isPublic: true
    },
    {
      id: 2,
      user_id: 1,
      setup:
        'My wife is really mad at the fact that I have no sense of direction.',
      punchline: 'So I packed up my stuff and right.',
      isPublic: false
    },
    {
      id: 3,
      user_id: 1,
      setup: 'How do you make holy water?',
      punchline: 'You boil the hell out of it.',
      isPublic: true
    }
  ]);
};
