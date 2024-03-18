import { hash, verify } from 'argon2';
import { handleError } from '../../common/errorResponse';
import { prisma, disconnectPrisma } from '../prisma';
import { AuthDto } from './dto/auth';
import { CreateUserDTO } from './dto/user';
import { generateToken } from '../../common/generateToken';
import { checkEmailExists } from './utils/verify.utils';

export const login = async ({ email, password }: AuthDto) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email, isActive: true },
    });
    if (!user) throw new Error('User incorrect');

    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) throw new Error('Password incorrect');

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      userTypeId: user.UserTypeId,
      createdAt: user.createdAt,
    };
    const token = await generateToken(tokenData);
    return token;
  } catch (error) {
    handleError(error, 'An error ocurred during validation');
  } finally {
    await disconnectPrisma();
  }
};

export const register = async (userData: CreateUserDTO) => {
  try {
    await checkEmailExists(userData.email);
    userData.password = await hash(userData.password);
    const userCreated = await prisma.user.create({
      data: {
        ...userData,
        createdAt: new Date(),
        isActive: true,
      },
    });

    const tokenData = {
      name: userData.name,
      email: userData.email,
      profilePic: userData.profilePic,
      createdAt: userData.createdAt,
      UserTypeId: userData.UserTypeId,
    };
    const token = await generateToken(tokenData);
    return { userCreated, token };
  } catch (error) {
    return handleError(error, 'Error creating');
  } finally {
    await disconnectPrisma();
  }
};
