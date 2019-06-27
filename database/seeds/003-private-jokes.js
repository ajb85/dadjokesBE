exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('privateJokes').del()
    .then(function () {
      // Inserts seed entries
      return knex('privateJokes').insert([
        { joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later.", user_id: 2},
        { joke: "Did you hear about the guy whose whole left side was cut off? He's all right now.", user_id: 2},
        { joke: "Why didn’t the skeleton cross the road? Because he had no guts.", user_id:2},
        { joke: "What did one nut say as he chased another nut?  I'm a cashew!", user_id:2 }
      ]);
    });
};
