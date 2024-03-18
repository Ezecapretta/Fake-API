import express from 'express';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from './author.controller';

const authorRouter = express.Router();

//Author
authorRouter.get('/', getAllAuthors);
authorRouter.get('/:id', getAuthorById);
authorRouter.post('/', createAuthor);
authorRouter.put('/:id', updateAuthor);
authorRouter.delete('/:id', deleteAuthor);

export default authorRouter;
