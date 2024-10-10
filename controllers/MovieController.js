const { Movie, sequelize } = require("../models/")

const GetAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.findAll()

    const formattedMovies = movies.map(movie => {
      const createdAt = new Date(movie.created_at).toISOString().slice(0, 19).replace('T', ' ');
      const updatedAt = new Date(movie.updated_at).toISOString().slice(0, 19).replace('T', ' ');

      return {
        ...movie.toJSON(),
        created_at: createdAt,
        updated_at: updatedAt
      };
    });

    res.status(200).json({
      code: 200,
      status: "OK",
      data: formattedMovies
    })
  } catch (error) {
    next(error)
  }
}

const GetMovieById = async (req, res, next) => {

  const { id } = req.params

  try {
    const movie = await Movie.findByPk(id)

    if(!movie) {
      throw {name: "DATA_NOT_FOUND"}
    }

    const createdAt = new Date(movie.created_at).toISOString().slice(0, 19).replace('T', ' ');
    const updatedAt = new Date(movie.updated_at).toISOString().slice(0, 19).replace('T', ' ');

    res.status(200).json({
      code:200,
      status: "OK",
      data: {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        rating: movie.rating,
        image: movie.image,
        created_at: createdAt,
        updated_at: updatedAt
      }
    })
  } catch (error) {
    next(error)
  }
}

const CreateMovie = async (req, res, next) => {
  const { title, description, rating, image } = req.body;

  const t = await sequelize.transaction();

  try {
    const movie = await Movie.create({
      title,
      description,
      rating,
      image
    }, { transaction: t });

    await t.commit();

    if(movie) {
      res.status(201).json({
        code: 201,
        status: "CREATED",
        data: {
          id: movie.id,
        }
      });
    }
  } catch (error) {
    await t.rollback();
    next(error);
  }
};


const UpdateMovie = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, rating, image } = req.body;

  const t = await sequelize.transaction();

  try {
    const movie = await Movie.findByPk(id, { transaction: t });

    if (!movie) {
      throw {name: "DATA_NOT_FOUND"};
    }

    await movie.update(
      { title, description, rating, image },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      code: 201,
      status: "UPDATED",
      data: movie
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

const DeleteMovie = async (req, res, next) => {
  const { id } = req.params;

  const t = await sequelize.transaction();

  try {
    const movie = await Movie.findByPk(id, { transaction: t });

    if (!movie) {
      throw { name: "DATA_NOT_FOUND" };
    }

    await movie.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      code: 200,
      status: "DELETED",
      message: "Movie has been deleted successfully"
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

module.exports = {
  GetAllMovies,
  GetMovieById,
  CreateMovie,
  UpdateMovie,
  DeleteMovie,
}