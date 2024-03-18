import { handleError } from '../../../common/errorResponse';
import { prisma, disconnectPrisma } from '../../prisma';


export const checkEmailExists = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) throw new Error('The email is already registered.');    
    return true;
  } catch (error) {
    handleError(error, 'Error check email');
  } finally {
    await disconnectPrisma();
  }
};
