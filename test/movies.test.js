const request = require('supertest');
const app = require('../index');

describe('API Movies', () => {
  it('🔎 Devrait retourner tous les films', async () => {
    const res = await request(app).get('/movies');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('➕ Devrait ajouter un nouveau film', async () => {
    const newMovie = { title: 'Dune', director: 'Denis Villeneuve' };
    const res = await request(app).post('/movies').send(newMovie);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Dune');
  });

  it('🔎 Devrait récupérer un film spécifique', async () => {
    const newMovie = { title: 'Terminator', director: 'James Cameron' };
    const createRes = await request(app).post('/movies').send(newMovie); // Ajoute un film

    const movieId = createRes.body.id; // Supposons que l'ID est renvoyé dans la réponse du POST
    const res = await request(app).get(`/movies/${movieId}`); // Récupère ce film via son ID

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Terminator');
    expect(res.body.director).toBe('James Cameron');
  });

  it('🗑️ Devrait supprimer un film', async () => {
    const newMovie = {
      title: 'The Matrix',
      director: 'Lana et Lilly Wachowski',
    };
    const createRes = await request(app).post('/movies').send(newMovie); // Ajoute un film

    const movieId = createRes.body.id; // Récupère l'ID du film ajouté
    const deleteRes = await request(app).delete(`/movies/${movieId}`); // Supprime ce film via son ID

    expect(deleteRes.statusCode).toBe(200); // Le code de statut devrait être 200 pour la suppression réussie
    expect(deleteRes.body.message).toBe('Film supprimé avec succès'); // Vérifie le message de réponse
  });
});
