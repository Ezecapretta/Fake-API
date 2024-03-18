import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  getAllCategoriesFromDB,
  getCategoryByIdFromDB,
  createCategoryInDB,
  updateCategoryInDB,
  deleteCategoryInDB,
} from './category.service';
import {
  CreateCategoryDTO,
  SearchIdCategoryDTO,
  UpdateCategoryDTO,
} from './dto/category';

export const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const { id, name, keyword } = req.query;
    const response = await getAllCategoriesFromDB(
      id as string,
      name as string,
      keyword as string,
    );
    return res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getCategoryById: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdCategoryDTO);
    const category = await getCategoryByIdFromDB(response.id);
    return res.status(200).json(category);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createCategory: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateCategoryDTO);
    await createCategoryInDB(response);
    return res.status(201).json(`Category Created`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateCategory: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name } = await validateAndCreate(data, UpdateCategoryDTO);
    await updateCategoryInDB(id, { name });
    return res.status(202).json(`Category updated successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdCategoryDTO);
    await deleteCategoryInDB(response.id);
    return res.status(202).json(`Category deleted successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
