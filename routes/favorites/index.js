const router = require('express').Router();
const Favorites = require('../../models/db/favorites.js');
const Jokes = require('../../models/db/jokes.js');

router.route('/').get(async (req, res) => {
  const { user_id } = res.locals.token;
  const allFavorites = await Favorites.find({ 'f.user_id': user_id });

  const publicFavorites = allFavorites.filter(
    f => f.isPublic || f.user_id === user_id
  );

  return res.status(200).json(publicFavorites);
});

router.route('/toggle/:joke_id').post(async (req, res) => {
  const { user_id } = res.locals.token;
  const { joke_id } = req.params;

  const joke = await Jokes.find({ 'j.id': joke_id }).first();

  if (joke && (joke.user_id === user_id || joke.isPublic)) {
    const toggled = await Favorites.toggle({ user_id, joke_id });
    joke.isFavorite = toggled.id ? true : false;

    return res.status(200).json(joke);
  } else
    return res.status(404).json({
      message: "That joke doesn't exist or you don't own the private joke."
    });
});

module.exports = router;
