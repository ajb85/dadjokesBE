const router = require("express").Router();
const Jokes = require("./privateJokesModel.js");
const restricted = require("../auth/restricted-middleware.js");
const db = require("../database/dbConfig.js");

router.get("/", restricted, (req, res) => {
  Jokes.find()
    .then(jokes => {
      res.status(200).json(jokes);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "Could not retrieve jokes." });
    });
});

router.post("/", restricted, async (req, res) => {
  req.body.user_id = req.decodedToken.subject;
  try {
    const newJoke = await Jokes.add(req.body);

    res.status(201).json(newJoke);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;

  if (!req.body.joke) {
    res.status(400).json({ errorMessage: "Jokes cannot be left blank." });
  } else {
    db("privateJokes")
      .where({ id })
      .update(req.body)
      .returning("id")
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res
            .status(404)
            .json({ errorMessage: "A joke with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err,
            message: "There was an error saving changes to your jokes."
          });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("privateJokes")
    .where({ id })
    .del()
    .returning("id")
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ errorMessage: "A joke the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err, message: "There was an error removing that joke." });
    });
});

module.exports = router;
