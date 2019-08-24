module.exports = { verifyJoke };

function verifyJoke(req, res, next) {
  const { setup, punchline } = req.body;

  if (setup && punchline) {
    req.body.isPublic = req.body.hasOwnProperty('isPublic')
      ? req.body.isPublic
      : true;
    next();
  } else {
    return res
      .status(400)
      .json({ message: 'A joke must include a setup and punchline.' });
  }
}
