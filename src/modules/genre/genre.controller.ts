import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  getAllGenresFromDB,
  getGenreByIdFromDB,
  createGenreInDB,
  updateGenreInDB,
  deleteGenreInDB,
} from './genre.service';
import { CreateGenreDTO, SearchIdGenreDTO, UpdateGenreDTO } from './dto/genre';

export const getAllGenres: RequestHandler = async (req, res) => {
  try {
    const { id, name, keyword } = req.query;
    const response = await getAllGenresFromDB(
      id as string,
      name as string,
      keyword as string,
    );
    return res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getGenreById: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdGenreDTO);
    const genre = await getGenreByIdFromDB(response.id);
    return res.status(200).json(genre);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createGenre: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateGenreDTO);
    await createGenreInDB(response);
    return res.status(201).json(`Genre Created`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateGenre: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name } = await validateAndCreate(data, UpdateGenreDTO);
    await updateGenreInDB(id, { name });
    return res.status(202).json(`Genre updated successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteGenre: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdGenreDTO);
    await deleteGenreInDB(response.id);
    return res.status(202).json(`Genre deleted successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
