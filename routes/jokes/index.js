const router = require('express').Router();
const Jokes = require('../../models/db/jokes.js');

router
  .route('/')
  .get(async (req, res) => {
    const jokes = await Jokes.find({ isPublic: true });
    return jokes.length
      ? res.status(200).json(jokes)
      : res.status(200).json({ message: 'No joke, there are no jokes!' });
  })
  .post(async (req, res) => {
    const joke = req.body;
    console.log(joke);
    return;
  });

module.exports = router;
