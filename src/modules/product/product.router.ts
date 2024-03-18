import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from './product.controller';

const productRouter = express.Router();

//Product
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter;
