import { hash } from 'argon2';
import { handleError } from '../../common/errorResponse';
import { CreateUserDTO, UpdateUserDTO } from './dto/user';
import { prisma, disconnectPrisma } from '../prisma';

export const getAllUsersFromDB = async (
  id?: string,
  name?: string,
  UserTypeId?: string,
  email?: string,
  keyword?: string,
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        ...(id && { id: id }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(UserTypeId && { UserTypeId: +UserTypeId }),
        ...(email && { email: email }),
        ...(keyword && {
          OR: [
            {
              id: { equals: keyword },
            },
            {
              name: { contains: keyword, mode: 'insensitive' },
            },
            {
              UserTypeId: { equals: +keyword || -1 },
            },
            {
              email: { contains: keyword, mode: 'insensitive' },
            },
          ],
        }),
      },
      include: {
        user_type: {
          select: {
            name: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    handleError(error, 'Error fetching products');
  } finally {
    await disconnectPrisma();
  }
};

export const getUserByIdFromDB = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id },
      include: {
        user_type: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!user) throw new Error('Invalid Id');
    return user;
  } catch (error) {
    handleError(error, 'Error fetching User by ID');
  } finally {
    await disconnectPrisma();
  }
};

export const createUserInDB = async (body: CreateUserDTO) => {
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: body?.email,
      },
    });
    body.password = await hash(body.password);
    if (userExists) throw new Error(`${body.email} this email already exists`);
    const newUser = await prisma.user.create({
      data: {
        name: body?.name,
        UserTypeId: +body?.UserTypeId,
        password: body?.password,
        profilePic: body?.profilePic,
        email: body?.email,
        isActive: true,
      },
    });
    return newUser;
  } catch (error) {
    handleError(error, 'Error creating User');
  } finally {
    await disconnectPrisma();
  }
};

export const updateUserInDB = async (
  id: string,
  data: Partial<UpdateUserDTO>,
) => {
  try {
    const userIdExists = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!userIdExists) throw new Error('Invalid Id');
    const emailExists = await prisma.user.findFirst({
      where: {
        email: data?.email,
      },
    });
    if (!emailExists)
      throw new Error(`${data.email} this email doesn't exists`);
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: {
        name: data?.name,
        password: data?.password,
        email: data?.email,
      },
    });
    return updatedUser;
  } catch (error) {
    handleError(error, 'Error updating User');
  } finally {
    await disconnectPrisma();
  }
};

export const deleteUserInDB = async (id: string) => {
  try {
    const userIdExists = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!userIdExists) throw new Error('Invalid Id');
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    return deletedUser;
  } catch (error) {
    handleError(error, 'Error deleting User');
  } finally {
    await disconnectPrisma();
  }
};
