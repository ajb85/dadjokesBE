const router = require('express').Router();
const Jokes = require('../../models/db/jokes.js');

const { verifyJoke } = require('../../middleware/jokes.js');

router
  .route('/')
  .get(async (req, res) => {
    const jokes = await Jokes.find({ isPublic: true });
    return jokes.length
      ? res.status(200).json(jokes)
      : res.status(200).json({ message: 'No joke, there are no jokes!' });
  })
  .post(verifyJoke, async (req, res) => {
    const { setup, punchline, isPublic } = req.body;
    const { user_id } = res.locals.token;

    const joke = await Jokes.create({ user_id, setup, punchline, isPublic });
    return res.status(201).json(joke);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { user_id } = res.locals.token;
    const { id } = req.params;
    const joke = await Jokes.find({ 'j.id': id }).first();
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
