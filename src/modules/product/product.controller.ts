import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  getAllProductsFromDB,
  getProductByIdFromDB,
  createProductInDB,
  updateProductInDB,
  deleteProductInDB,
} from './product.service';
import {
  SearchIdProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from './dto/product';

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const { id, name, price, amount, AuthorId, CategoryId, page, limit } =
      req.query;
    const response = await getAllProductsFromDB(
      id as string,
      name as string,
      AuthorId as string,
      CategoryId as string,
      amount as string,
      price as string,
      page as string,
      limit as string,
    );
    return res.status(200).json({
      response,
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdProductDTO);
    const product = await getProductByIdFromDB(response.id);
    return res.status(200).json(product);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createProduct: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateProductDTO);
    await createProductInDB(response);
    return res.status(201).json('Product created succesfully');
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name, amount, price, image, available } =
      await validateAndCreate(data, UpdateProductDTO);
    await updateProductInDB(id, { name, amount, price, image, available });
    return res.status(202).json('Product updated succesfully');
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdProductDTO);
    await deleteProductInDB(response.id);
    return res.status(202).json('Product deleted succesfully');
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
