import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  getAllAuthorsFromDB,
  getAuthorByIdFromDB,
  createAuthorInDB,
  updateAuthorInDB,
  deleteAuthorInDB,
} from './author.service';
import {
  CreateAuthorDTO,
  SearchIdAuthorDTO,
  UpdateAuthorDTO,
} from './dto/author';

export const getAllAuthors: RequestHandler = async (req, res) => {
  try {
    const { id, name, GenreId, keyword } = req.query;
    const response = await getAllAuthorsFromDB(
      id as string,
      name as string,
      GenreId as string,
      keyword as string,
    );
    return res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getAuthorById: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdAuthorDTO);
    const author = await getAuthorByIdFromDB(response.id);
    return res.status(200).json(author);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createAuthor: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateAuthorDTO);
    await createAuthorInDB(response);
    return res.status(201).json(`Author Created succesfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateAuthor: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name } = await validateAndCreate(data, UpdateAuthorDTO);
    await updateAuthorInDB(id, { name });
    return res.status(202).json(`Author updated successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteAuthor: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdAuthorDTO);
    await deleteAuthorInDB(response.id);
    return res.status(202).json(`Author deleted successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
