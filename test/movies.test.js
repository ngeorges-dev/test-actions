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

  it('🔄 Devrait mettre à jour un film   ', async () => {
    const newMovie = { title: 'Inception', director: 'Christopher Nolan' };
    const createRes = await request(app).post('/movies').send(newMovie); // Ajoute un film

    const movieId = createRes.body.id; // Récupère l'ID du film ajouté
    const updatedMovie = {
      title: 'Inception',
      director: 'Christopher Nolan',
      year: 2010,
    };
    const updateRes = await request(app)
      .put(`/movies/${movieId}`)
      .send(updatedMovie); // Met à jour le film

    expect(updateRes.statusCode).toBe(200); // Le code de statut devrait être 200 pour la mise à jour réussie
    expect(updateRes.body.year).toBe(2010); // Vérifie si l'année a été mise à jour
  });

  it('❌ Devrait retourner une erreur si le film n\'est pas trouvé', async () => {
    // Test avec un ID de film qui n'existe pas
    const res = await request(app).get('/movies/999999');
    
    expect(res.statusCode).toBe(404); // Le code de statut devrait être 404 pour un film non trouvé
    expect(res.body.message).toBe('Film non trouvé'); // Message d'erreur attendu
  });
});
