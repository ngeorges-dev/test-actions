const express = require('express');

const app = express();
app.use(express.json());

let movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan' },
  { id: 2, title: 'Interstellar', director: 'Christopher Nolan' },
];

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    res.status(404).json({ message: 'Film non trouvé' });
    return;
  }

  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter((movie) => movie.id !== id);
  res.json({ message: 'Film supprimé avec succès' });
});

module.exports = app;
