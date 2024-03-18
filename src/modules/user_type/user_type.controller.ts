import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  getAllUsersTypesfromDB,
  getUserTypeByIdFromDB,
  createUserTypeInDB,
  updateUserTypeInDB,
  deleteUserTypeInDB,
} from './user_type.service';
import {
  CreateUserTypeDTO,
  SearchIdUserTypeDTO,
  UpdateUserTypeDTO,
} from './dto/user_type';

export const getAllUsersTypes: RequestHandler = async (req, res) => {
  try {
    const { id, name, keyword } = req.query;
    const response = await getAllUsersTypesfromDB(
      id as string,
      name as string,
      keyword as string,
    );
    return res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserTypeById: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdUserTypeDTO);
    const userType = await getUserTypeByIdFromDB(response.id);
    return res.status(200).json(userType);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createUserType: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateUserTypeDTO);
    await createUserTypeInDB(response);
    return res.status(201).json(`User Type Created successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateUserType: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name } = await validateAndCreate(data, UpdateUserTypeDTO);
    await updateUserTypeInDB(id, { name });
    return res.status(202).json(`User Type updated successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUserType: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdUserTypeDTO);
    await deleteUserTypeInDB(response.id);
    return res.status(202).json(`User Type deleted successfully`);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
