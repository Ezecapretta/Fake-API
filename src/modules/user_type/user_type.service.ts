import { handleError } from '../../common/errorResponse';
import { CreateUserTypeDTO, UpdateUserTypeDTO } from './dto/user_type';
import { prisma, disconnectPrisma } from '../prisma';

export const getAllUsersTypesfromDB = async (
  id?: string,
  name?: string,
  keyword?: string,
) => {
  try {
    const usersTypes = await prisma.user_type.findMany({
      where: {
        ...(id && { id: +id }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(keyword && {
          OR: [
            {
              id: { equals: +keyword || -1 },
            },
            {
              name: { contains: keyword, mode: 'insensitive' },
            },
          ],
        }),
      },
    });
    return usersTypes;
  } catch (error) {
    handleError(error, 'Error fetching usersTypes');
  } finally {
    await disconnectPrisma();
  }
};

export const getUserTypeByIdFromDB = async (id: string) => {
  try {
    const userType = await prisma.user_type.findFirst({
      where: { id: +id },
    });
    if (!userType) throw new Error('Invalid Id');
    return userType;
  } catch (error) {
    handleError(error, 'Error fetching user_type by ID');
  } finally {
    await disconnectPrisma();
  }
};

export const createUserTypeInDB = async (body: CreateUserTypeDTO) => {
  try {
    const userTypeExists = await prisma.user_type.findFirst({
      where: {
        name: body?.name,
      },
    });
    if (userTypeExists) throw new Error(`${body.name} already exists`);
    const newUserType = await prisma.user_type.create({
      data: {
        name: body?.name,
      },
    });
    return newUserType;
  } catch (error) {
    handleError(error, 'Error creating UserType');
  } finally {
    await disconnectPrisma();
  }
};

export const updateUserTypeInDB = async (
  id: string,
  data: Partial<UpdateUserTypeDTO>,
) => {
  try {
    const userTypeIdExists = await prisma.user_type.findUnique({
      where: {
        id: +id,
      },
    });
    if (!userTypeIdExists) throw new Error('Invalid Id');
    const updatedUserType = await prisma.user_type.update({
      where: { id: +id },
      data: {
        name: data.name,
      },
    });
    return updatedUserType;
  } catch (error) {
    handleError(error, 'Error updating user_type');
  } finally {
    await disconnectPrisma();
  }
};

export const deleteUserTypeInDB = async (id: string) => {
  try {
    const userTypeIdExists = await prisma.user_type.findUnique({
      where: {
        id: +id,
      },
    });
    if (!userTypeIdExists) throw new Error('Invalid Id');
    const deletedUserType = await prisma.user_type.delete({
      where: { id: +id },
    });
    return deletedUserType;
  } catch (error) {
    handleError(error, 'Error deleting user-type');
  } finally {
    await disconnectPrisma();
  }
};
