const db = require('./dbconfig');

// Get all movies
const getAllMovies = (req, res) => {
    db.query('SELECT * FROM movies', (err, result) => {
        if (err)
            console.error(err);
        else
            res.json(result.rows)
    })
}

// Get movie by id
const getMovieById = (req, res) => {
    const query = {
        text: 'SELECT * FROM movies WHERE id = $1',
        values: [req.params.id],
    }

    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else
                res.status(404).end();
        }
    })
}

// Add new movie
const addMovie = (req, res) => {
    // Extract movie from the request body
    const newMovie = req.body;

    const query = {
        text: 'INSERT INTO movies (title, director, year) VALUES ($1, $2, $3)',
        values: [newMovie.title, newMovie.director, newMovie.year],
    }

    db.query(query, (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })

    res.json(newMovie);
}

// Delete all movies
const deleteAllMovies = () => {
    db.query('DELETE FROM movies', (err, res) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    })
}

module.exports = {
    getAllMovies: getAllMovies,
    getMovieById: getMovieById,
    addMovie: addMovie,
    deleteAllMovies: deleteAllMovies
}