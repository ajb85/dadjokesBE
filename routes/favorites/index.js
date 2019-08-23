const router = require('express').Router();
const Favorites = require('../../models/db/favorites.js');

router.route('/user').get(async (req, res) => {
  console.log(res.locals.user);
  return;
  //   const { user_id } = req.locals.user;
  //   const favorites = await Favorites.find({ user_id });

  //   return res.status(200).json(favorites);
});

router.route('/favorites/toggle').post(async (req, res) => {
  const { user_id, joke_id } = req.body;
  await Favorites.toggle({ user_id, joke_id });
  const favorites = await Favorites.find({ user_id });

  return res.status(200).json({ favorites });
});

module.exports = router;
