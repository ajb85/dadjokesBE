const router = require('express').Router();
const Votes = require('../../models/db/votes.js');
const Jokes = require('../../models/db/jokes.js');

router.route('/count/:joke_id').get(async (req, res) => {
  const { user_id } = res.locals.token;
  const { joke_id } = req.params;

  const all_upvotes = Votes.find({ 'j.id': joke_id, 'v.score': 1 });
  const all_downvotes = Votes.find({ 'j.id': joke_id, 'v.score': -1 });

  const joke = await Jokes.find({
    'j.id': joke_id
  }).first();

  joke && (joke.isPublic || joke.user_id === user_id)
    ? res
        .status(200)
        .json({ upvotes: all_upvotes.length, downvotes: all_downvotes.length })
    : res.status(404).json({
        message: 'Could not find a joke with that ID you have access to.'
      });
});

router.route('/up/:joke_id').post((req, res) => {
  return handleVotes(req, res, 1);
});

router.route('/down/:joke_id').post((req, res) => {
  return handleVotes(req, res, -1);
});

async function handleVotes(req, res, vote) {
  const { user_id } = res.locals.token;
  const { joke_id } = req.params;

  const existing = await Votes.find({
    'v.user_id': user_id,
    'v.joke_id': joke_id
  }).first();

  let newVote;
  let status;

  if (existing && existing.vote === vote) {
    newVote = await Votes.remove(existing.id);
    status = 204;
  } else if (existing && existing.vote === -vote) {
    newVote = await Votes.edit({ user_id, joke_id }, { vote });
    status = 200;
  } else if (!existing) {
    newVote = await Votes.create({ user_id, joke_id, vote });
    status = 201;
  }

  return res.status(status).json(newVote);
}

module.exports = router;
