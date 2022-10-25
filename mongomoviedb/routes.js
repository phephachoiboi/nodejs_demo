const express = require('express');
const router = express.Router();
const Movie = require('./models/movie');

// Fetch all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies)
  } catch(err) {
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;