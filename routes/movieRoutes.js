const { GetAllMovies, GetMovieById, CreateMovie, UpdateMovie, DeleteMovie } = require('../controllers/MovieController');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API endpoints for managing movies
 */

/**
 * @swagger
 * /movies:
 *    get:
 *      summary: Retrieve a list of all Movies
 *      tags: [Movies]
 *      responses:
 *        200:
 *          description: A list of Movies
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        title: 
 *                          type: string
 *                        description: 
 *                          type: string
 *                        rating: 
 *                          type: number
 *                          format: float
 *                        image:
 *                          type: string
 *                        created_at:
 *                          type: string
 *                        updated_at:
 *                          type: string
 *        500:
 *          description: Internal server error
 */
router.get("/", GetAllMovies);


/**
 * @swagger
 * /movies/{id}:
 *    get:
 *      summary: Retrieve movies By ID
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID of the movies to retrieve
 *      responses:
 *        200:
 *          description: A list of Movies
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      title: 
 *                        type: string
 *                      description:
 *                        type: string
 *                      rating:
 *                        type: number
 *                        format: float
 *                      image:
 *                        type: string              
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BadRequestError'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DataNotFound'
 *        500:
 *          description: Internal server error
 */
router.get("/:id", GetMovieById);

/**
 * @swagger
 *  /movies:
 *    post:
 *      summary: Create new Movie
 *      tags: [Movies]
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: "New Movie"
 *                description:
 *                  type: string
 *                rating:
 *                  type: number
 *                  format: float
 *                image:
 *                  type: string               
 *      responses:
 *        201:
 *          description: Movie created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BadRequestError'
 *        500:
 *          description: Internal server error
 */
router.post("/", CreateMovie);


/**
 * @swagger
 *  /movies/{id}:
 *    patch:
 *      summary: Update Movie
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID of the movie to retrieve
 *      requestBody:
 *        require: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: "New Update Movie"
 *                description:
 *                  type: string
 *                rating:
 *                  type: number
 *                  format: float
 *                image:
 *                  type: string    
 *      responses:
 *        201:
 *          description: Movie updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      category_name:
 *                        type: string
 *                      status:
 *                        type: boolean
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BadRequestError'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DataNotFound'
 *        500:
 *          description: Internal server error
 */
router.patch("/:id", UpdateMovie);

/**
 * @swagger
 *  /movies/{id}:
 *    delete:
 *      summary: Delete Movie
 *      tags: [Movies]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: ID of the movie to retrieve
 *      responses:
 *        200:
 *          description: Movie deleted successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  status:
 *                    type: string
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BadRequestError'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/DataNotFound'
 *        500:
 *          description: Internal server error
 */
router.delete("/:id", DeleteMovie);

module.exports = router