const router = require('express').Router();
const Favorites = require('../../models/db/favorites.js');

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
  const toggled = await Favorites.toggle({ user_id, joke_id });

  return toggled.id
    ? res.status(200).json(toggled)
    : toggled
    ? res.sendStatus(200)
    : res.status(404).json({ message: "I didn't find a joke to toggle" });
});

module.exports = router;
