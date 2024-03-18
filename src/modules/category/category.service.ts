import { handleError } from '../../common/errorResponse';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/category';
import { prisma, disconnectPrisma } from '../prisma';

export const getAllCategoriesFromDB = async (
  id?: string,
  name?: string,
  keyword?: string,
) => {
  try {
    const categories = await prisma.category.findMany({
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
    return categories;
  } catch (error) {
    handleError(error, 'Error fetching categories');
  } finally {
    await disconnectPrisma();
  }
};

export const getCategoryByIdFromDB = async (id: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: { id: +id },
    });
    if (!category) throw new Error('Invalid Id');
    return category;
  } catch (error) {
    handleError(error, 'Error fetching category by ID');
  } finally {
    await disconnectPrisma();
  }
};

export const createCategoryInDB = async (body: CreateCategoryDTO) => {
  try {
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: body?.name,
      },
    });
    if (categoryExists) throw new Error(`${body.name} already exists`);
    const newCategory = await prisma.category.create({
      data: {
        name: body?.name,
      },
    });
    return newCategory;
  } catch (error) {
    handleError(error, 'Error creating category');
  } finally {
    await disconnectPrisma();
  }
};

export const updateCategoryInDB = async (
  id: string,
  data: Partial<UpdateCategoryDTO>,
) => {
  try {
    const categoryIdExists = await prisma.category.findUnique({
      where: {
        id: +id,
      },
    });
    if (!categoryIdExists) throw new Error('Invalid Id');
    const updatedCategory = await prisma.category.update({
      where: { id: +id },
      data: {
        name: data.name,
      },
    });
    return updatedCategory;
  } catch (error) {
    handleError(error, 'Error updating category');
  } finally {
    await disconnectPrisma();
  }
};

export const deleteCategoryInDB = async (id: string) => {
  try {
    const categoryIdExists = await prisma.category.findUnique({
      where: {
        id: +id,
      },
    });
    if (!categoryIdExists) throw new Error('Invalid Id');
    const deletedCategory = await prisma.category.delete({
      where: { id: +id },
    });
    return deletedCategory;
  } catch (error) {
    handleError(error, 'Error deleting category');
  } finally {
    await disconnectPrisma();
  }
};
