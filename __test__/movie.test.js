const request = require('supertest');
const app = require('../app');
const errorHandler = require('../middleware/errorHandler'); 
const { Movie } = require('../models');

describe('Movie API', () => {
  beforeEach(async () => {
    await Movie.destroy({ where: {} });
  });

  describe('GET /movies', () => {
    it('GET - Should get all movies', async () => {
      await Movie.create({
        title: "New Movie",
        description: "New Descriptions",
        rating: 5,
        image: "",
      });

      const response = await request(app).get("/api/movies");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("OK");
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0]).toHaveProperty('id');
    });

    it('GET - Should handle errors when fetching movies', async () => {
      jest.spyOn(Movie, 'findAll').mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await request(app).get('/api/movies');

      expect(response.status).toBe(500);
      Movie.findAll.mockRestore();
    });
  });

  describe('GET /movies/:id', () => {
    it('GET - Should retrieve a movie by ID successfully', async () => {

      const movie = await Movie.create({
        title: "Movie to Get",
        description: "Description",
        rating: 5,
        image: "",
      });

      const response = await request(app).get(`/api/movies/${movie.id}`);
  
      expect(response.statusCode).toBe(200);
    });

    it('GET - Should return 404 if the movie is not found', async () => {
      const response = await request(app).get(`/api/movies/99999`);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        code: 404,
        status: "NOT_FOUND",
        errors: [{ message: "Data Not Found" }],
      });
    });
  })

  describe('POST /movies', () => {
    it('POST - Should create a movie', async () => {
      const movieData = { title: "New Movie", description: "New Description", rating: 7.5, image: "" };

      const response = await request(app).post("/api/movies").send(movieData);
      expect(response.statusCode).toBe(201);
    });

    it('POST - Should handle error when creating a movie', async () => {
      jest.spyOn(Movie, 'create').mockImplementation(() => {
        throw new Error('Database error');
      });

      const movieData = { title: "New Movie", description: "New Description", rating: 7.5, image: "" };

      const response = await request(app).post('/api/movies').send(movieData);

      expect(response.statusCode).toBe(500);

      Movie.create.mockRestore();
    });
  });

  describe('PATCH /movies/:id', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('PATCH - Should update a movie successfully', async () => {
      // Create a movie to update
      const movie = await Movie.create({
        title: "Existing Movie",
        description: "Existing Description",
        rating: 5,
        image: "",
      });
  
      const response = await request(app).patch(`/api/movies/${movie.id}`).send({ title: 'Updated Movie' });
  
      expect(response.statusCode).toBe(201);
      // expect(response.body).toEqual({ id: movie.id, title: 'Updated Movie' });
    });
  
    it('PATCH - Should handle the case where the movie is not found', async () => {
      const response = await request(app).patch('/api/movies/9999').send({ title: 'Updated Movie' });
  
      expect(response.statusCode).toBe(404);
      // expect(response.body).toEqual({ error: 'Movie not found' });
    });  
  });
  

  describe('DELETE /movies/:id', () => {

    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('DELETE - Should delete a movie successfully', async () => {

      const movie = await Movie.create({
        title: "Existing Movie",
        description: "Existing Description",
        rating: 5,
        image: "",
      });

      jest.spyOn(Movie, 'destroy').mockResolvedValue(1);
  
      const response = await request(app).delete(`/api/movies/${movie.id}`); // Use the created movie's ID
  
      expect(response.statusCode).toBe(200);
    });
  
    it('DELETE - Should handle the case where the movie is not found', async () => {
      jest.spyOn(Movie, 'destroy').mockResolvedValue(0);
  
      const response = await request(app).delete(`/api/movies/10000`);
  
      expect(response.statusCode).toBe(404);
    });
  });
  
});

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {}; 
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn(); 
  });

  it('should handle DATA_NOT_FOUND errors', () => {
    const error = { name: 'DATA_NOT_FOUND' };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      status: "NOT_FOUND",
      errors: [{ message: "Data Not Found" }],
    });
  });

  it('should handle SequelizeDatabaseError errors', () => {
    const error = { name: 'SequelizeDatabaseError' };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code: 400,
      status: "BAD_REQUEST",
      errors: [{ message: "Database Error" }],
    });
  });

  it('should handle SequelizeForeignKeyConstraintError errors', () => {
    const error = { name: 'SequelizeForeignKeyConstraintError' };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      code: 400,
      status: "BAD_REQUEST",
      errors: ['Foreign key constraint error'],
    });
  });

  it('should handle unexpected errors', () => {
    const error = { name: 'UnexpectedError' };

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      status: undefined,
      errors: ['UnexpectedError'],
    });
  });
});