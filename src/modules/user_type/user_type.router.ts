import express from 'express';
import {
  getAllUsersTypes,
  getUserTypeById,
  createUserType,
  updateUserType,
  deleteUserType,
} from './user_type.controller';

const userTypeRouter = express.Router();

//User Type
userTypeRouter.get('/', getAllUsersTypes);
userTypeRouter.get('/:id', getUserTypeById);
userTypeRouter.post('/', createUserType);
userTypeRouter.put('/:id', updateUserType);
userTypeRouter.delete('/:id', deleteUserType);

export default userTypeRouter;
