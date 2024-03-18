import { RequestHandler } from 'express';
import { validateAndCreate } from '../../common/validateInstance';
import { AuthDto } from './dto/auth';
import { CreateUserDTO } from './dto/user';
import { login, register } from './auth.service';
import { handleErrorResponse } from '../../common/errorResponse';

export const signIn: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, AuthDto);
    const loginUser = await login(response);
    return res.status(200).json(loginUser);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const signUp: RequestHandler = async (req, res) => {
  try {
    const response = await validateAndCreate(req.body, CreateUserDTO);
    const registerUser = await register(response);
    return res.status(200).json({
      token: registerUser,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
