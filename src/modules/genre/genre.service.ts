import { handleError } from '../../common/errorResponse';
import { CreateGenreDTO, UpdateGenreDTO } from './dto/genre';
import { prisma, disconnectPrisma } from '../prisma';

export const getAllGenresFromDB = async (
  id?: string,
  name?: string,
  keyword?: string,
) => {
  try {
    const genres = await prisma.genre.findMany({
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
    return genres;
  } catch (error) {
    handleError(error, 'Error fetching genres');
  } finally {
    await disconnectPrisma();
  }
};

export const getGenreByIdFromDB = async (id: string) => {
  try {
    const genre = await prisma.genre.findFirst({
      where: { id: +id },
    });
    if (!genre) throw new Error('Invalid Id');
    return genre;
  } catch (error) {
    handleError(error, 'Error fetching genre by ID');
  } finally {
    await disconnectPrisma();
  }
};

export const createGenreInDB = async (body: CreateGenreDTO) => {
  try {
    const genreExists = await prisma.genre.findFirst({
      where: {
        name: body?.name,
      },
    });
    if (genreExists) throw new Error(`${body.name} already exists`);
    const newgenre = await prisma.genre.create({
      data: {
        name: body?.name,
      },
    });
    return newgenre;
  } catch (error) {
    handleError(error, 'Error creating genre');
  } finally {
    await disconnectPrisma();
  }
};

export const updateGenreInDB = async (
  id: string,
  data: Partial<UpdateGenreDTO>,
) => {
  try {
    const genreIdExists = await prisma.genre.findUnique({
      where: {
        id: +id,
      },
    });
    if (!genreIdExists) throw new Error('Invalid Id');
    const updatedgenre = await prisma.genre.update({
      where: { id: +id },
      data: {
        name: data.name,
      },
    });
    return updatedgenre;
  } catch (error) {
    handleError(error, 'Error updating genre');
  } finally {
    await disconnectPrisma();
  }
};

export const deleteGenreInDB = async (id: string) => {
  try {
    const genreIdExists = await prisma.genre.findUnique({
      where: {
        id: +id,
      },
    });
    if (!genreIdExists) throw new Error('Invalid Id');
    const deletedCaegory = await prisma.genre.delete({
      where: { id: +id },
    });
    return deletedCaegory;
  } catch (error) {
    handleError(error, 'Error deleting genre');
  } finally {
    await disconnectPrisma();
  }
};
