import express from 'express';
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from './genre.controller';

const genreRouter = express.Router();

//Genre
genreRouter.get('/', getAllGenres);
genreRouter.get('/:id', getGenreById);
genreRouter.post('/', createGenre);
genreRouter.put('/:id', updateGenre);
genreRouter.delete('/:id', deleteGenre);

export default genreRouter;
