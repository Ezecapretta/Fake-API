import { handleError } from '../../common/errorResponse';
import { CreateAuthorDTO, UpdateAuthorDTO } from './dto/author';
import { prisma, disconnectPrisma } from '../prisma';

export const getAllAuthorsFromDB = async (
  id?: string,
  name?: string,
  GenreId?: string,
  keyword?: string,
) => {
  try {
    const author = await prisma.author.findMany({
      where: {
        ...(id && { id: +id }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(GenreId && { GenreId: +GenreId }),
        ...(keyword && {
          OR: [
            {
              id: { equals: +keyword || -1 },
            },
            {
              name: { contains: keyword, mode: 'insensitive' },
            },
            {
              GenreId: { equals: +keyword || -1 },
            },
          ],
        }),
      },
      include: {
        genre: {
          select: {
            name: true,
          },
        },
      },
    });
    return author;
  } catch (error) {
    handleError(error, 'Error fetching authors');
  } finally {
    await disconnectPrisma();
  }
};

export const getAuthorByIdFromDB = async (id: string) => {
  try {
    const author = await prisma.author.findFirst({
      where: { id: +id },
      include: {
        genre: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!author) throw new Error('Invalid Id');
    return author;
  } catch (error) {
    handleError(error, 'Error fetching author by ID');
  } finally {
    await disconnectPrisma();
  }
};

export const createAuthorInDB = async (body: CreateAuthorDTO) => {
  try {
    const authorExists = await prisma.author.findFirst({
      where: {
        name: body?.name,
      },
    });
    if (authorExists) throw new Error(`${body.name} already exists`);
    const genreExists = await prisma.genre.findFirst({
      where: {
        id: +body?.GenreId,
      },
    });
    if (!genreExists) throw new Error(`That genre doesn't exists`);
    const newauthor = await prisma.author.create({
      data: {
        name: body?.name,
        GenreId: +body?.GenreId,
      },
    });
    return newauthor;
  } catch (error) {
    handleError(error, 'Error creating author');
  } finally {
    await disconnectPrisma();
  }
};

export const updateAuthorInDB = async (
  id: string,
  data: Partial<UpdateAuthorDTO>,
) => {
  try {
    const authorIdExists = await prisma.author.findUnique({
      where: {
        id: +id,
      },
    });
    if (!authorIdExists) throw new Error('Invalid Id');
    const updatedAuthor = await prisma.author.update({
      where: { id: +id },
      data: {
        name: data.name,
      },
    });
    return updatedAuthor;
  } catch (error) {
    handleError(error, 'Error updating author');
  } finally {
    await disconnectPrisma();
  }
};

export const deleteAuthorInDB = async (id: string) => {
  try {
    const authorIdExists = await prisma.author.findUnique({
      where: {
        id: +id,
      },
    });
    if (!authorIdExists) throw new Error('Invalid Id');
    const deletedAuthor = await prisma.author.delete({
      where: { id: +id },
    });
    return deletedAuthor;
  } catch (error) {
    handleError(error, 'Error deleting author');
  } finally {
    await disconnectPrisma();
  }
};
