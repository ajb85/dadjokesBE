const router = require('express').Router();
const Jokes = require('../../models/db/jokes.js');
const Favorites = require('../../models/db/favorites.js');

const { verifyJoke } = require('../../middleware/jokes.js');

router
  .route('/')
  .get(async (req, res) => {
    const { user_id } = res.locals.token;
    const jokes = await Jokes.find({ 'j.isPublic': true });
    // This is a terrible way to do this but it gets the product shipped....
    const user_favorites = await Favorites.find({ 'f.user_id': user_id });
    const ids = {};
    user_favorites.forEach(f => {
      if (!ids[f.joke_id]) ids[f.joke_id] = true;
    });
    jokes.forEach((j, i) => {
      if (ids[j.id]) jokes[i].isFavorite = true;
      else jokes[i].isFavorite = false;
    });

    return jokes.length
      ? res.status(200).json(jokes)
      : res.status(200).json({ message: 'No joke, there are no jokes!' });
  })
  .post(verifyJoke, async (req, res) => {
    const { setup, punchline, isPublic } = req.body;
    const { user_id } = res.locals.token;

    const joke = await Jokes.create({ user_id, setup, punchline, isPublic });
    joke.isFavorite = false;
    return res.status(201).json(joke);
  });

router.route('/by_user').get(async (req, res) => {
  const { user_id } = res.locals.token;
  const jokes = await Jokes.find({ 'j.user_id': user_id });

  const user_favorites = await Favorites.find({ 'f.user_id': user_id });
  const ids = {};
  user_favorites.forEach(f => {
    if (!ids[f.joke_id]) ids[f.joke_id] = true;
  });
  jokes.forEach((j, i) => {
    if (ids[j.id]) jokes[i].isFavorite = true;
    else jokes[i].isFavorite = false;
  });

  return res.status(200).json(jokes);
});

router
  .route('/single/:id')
  .get(async (req, res) => {
    const { user_id } = res.locals.token;
    const { id } = req.params;
    const joke = await Jokes.find({ 'j.id': id }).first();
    const favorite = await Favorites.find({ 'f.joke_id': joke.id });
    joke.isFavorite = favorite ? true : false;

    return joke && (joke.isPublic || joke.user_id === user_id)
      ? res.status(200).json(joke)
      : res
          .status(404)
          .json({ message: 'You do not have a joke with that ID' });
  })
  .delete(async (req, res) => {
    const { user_id } = res.locals.token;
    const { id } = req.params;
    const del = await Jokes.remove({ user_id, id });
    return del
      ? res.sendStatus(200)
      : res
          .status(404)
          .json({ message: 'You do not have a joke with that ID' });
  });

module.exports = router;
