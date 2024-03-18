import { handleError } from '../../common/errorResponse';
import { CreateProductDTO, UpdateProductDTO } from './dto/product';
import { prisma, disconnectPrisma } from '../prisma';

export const getAllProductsFromDB = async (
  id?: string,
  name?: string,
  AuthorId?: string,
  CategoryId?: string,
  amount?: string,
  price?: string,
  keyword?: string,
  page?: string,
  limits?: string,
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        ...(id && { id: +id }),
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(AuthorId && { AuthorId: +AuthorId }),
        ...(CategoryId && { CategoryId: +CategoryId }),
        ...(amount && { amount: +amount }),
        ...(price && { price: +price }),
        ...(keyword && {
          OR: [
            {
              id: { equals: +keyword || -1 },
            },
            {
              name: { contains: keyword, mode: 'insensitive' },
            },
            {
              AuthorId: { equals: +keyword || -1 },
            },
            {
              CategoryId: { equals: +keyword || -1 },
            },
            {
              price: { equals: +keyword || -1 },
            },
          ],
        }),
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    handleError(error, 'Error fetching products');
  } finally {
    await disconnectPrisma();
  }
};

export const getProductByIdFromDB = async (id: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: { id: +id },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!product) throw new Error('Invalid Id');
    return product;
  } catch (error) {
    handleError(error, 'Error fetching product by ID');
  } finally {
    await disconnectPrisma();
  }
};

export const createProductInDB = async (body: CreateProductDTO) => {
  try {
    const productExists = await prisma.product.findFirst({
      where: {
        name: body?.name,
      },
    });
    if (productExists) throw new Error(`${body.name} already exists`);
    const category = await prisma.category.findFirst({
      where: {
        id: +body?.CategoryId,
      },
    });
    if (!category) {
      throw new Error(`Category ${body?.CategoryId} not found`);
    }
    const author = await prisma.author.findFirst({
      where: {
        id: +body?.AuthorId,
      },
    });
    if (!author) {
      throw new Error(`Author ${body?.AuthorId} not found`);
    }
    const newProduct = await prisma.product.create({
      data: {
        name: body?.name,
        amount: body?.amount,
        AuthorId: +body?.AuthorId,
        CategoryId: +body?.CategoryId,
        description: body?.description,
        price: +body?.price,
        image: body?.image,
        available: true,
      },
    });
    return newProduct;
  } catch (error) {
    handleError(error, 'Error creating product');
  } finally {
    await disconnectPrisma();
  }
};

export const updateProductInDB = async (
  id: string,
  data: Partial<UpdateProductDTO>,
) => {
  try {
    const productIdExists = await prisma.product.findUnique({
      where: { id: +id },
    });
    if (!productIdExists) throw new Error('Invalid Id');
    const updatedProduct = await prisma.product.update({
      where: { id: +id },
      data: {
        name: data?.name,
        amount: data?.amount,
        price: data?.price,
        image: data?.image,
        available: data?.available,
      },
    });
    return updatedProduct;
  } catch (error) {
    handleError(error, 'Error updating product');
  } finally {
    await disconnectPrisma();
  }
};

export const deleteProductInDB = async (id: string) => {
  try {
    const productIdExists = await prisma.product.findUnique({
      where: { id: +id },
    });
    if (!productIdExists) throw new Error('Invalid Id');
    const deletedProduct = await prisma.product.delete({
      where: { id: +id },
    });
    return deletedProduct;
  } catch (error) {
    handleError(error, 'Error deleting product');
  } finally {
    await disconnectPrisma();
  }
};
