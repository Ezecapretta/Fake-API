import { RequestHandler } from 'express';
import { handleErrorResponse } from '../../common/errorResponse';
import { validateAndCreate } from '../../common/validateInstance';
import {
  getAllUsersFromDB,
  getUserByIdFromDB,
  createUserInDB,
  updateUserInDB,
  deleteUserInDB,
} from './user.service';
import { SearchIdUserDTO, CreateUserDTO, UpdateUserDTO } from './dto/user';

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const { id, name, UserTypeId, email } = req.query;
    const response = await getAllUsersFromDB(
      id as string,
      name as string,
      UserTypeId as string,
      email as string,
    );
    return res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdUserDTO);
    const user = await getUserByIdFromDB(response.id);
    return res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const createUser: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateUserDTO);
    await createUserInDB(response);
    return res.status(202).json('User created successfully');
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const data = { ...req.body, ...req.params };
    const { id, name, password, email } = await validateAndCreate(
      data,
      UpdateUserDTO,
    );
    await updateUserInDB(id, { name, password, email });
    return res.status(202).json('User updated succesfully');
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.params, SearchIdUserDTO);
    await deleteUserInDB(response.id);
    return res.status(202).json('User deleted succesfully');
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
