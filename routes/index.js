const router = require('express').Router();
const movieRouter = require('./movieRoutes');

router.use("/movies", movieRouter);

/**
 * @swagger
 * components:
 *  schemas:
 *    BadRequestError:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        status:
 *          type: string
 *        errors:
 *          type: array
 *          items:
 *            type: object
 *    DataNotFound:
 *      type: object
 *      properties:
 *        code:
 *          type: integer
 *        status:
 *          type: string
 *        errors:
 *          type: array
 *          items:
 *            type: object
 */

module.exports = router