import express from 'express';
import categoryRouter from '../modules/category/category.router';
import genreRouter from '../modules/genre/genre.router';
import authorRouter from '../modules/author/author.router';
import productRouter from '../modules/product/product.router';
import userTypeRouter from '../modules/user_type/user_type.router';
import userRouter from '../modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import verifyJwtToken from '../common/verifyJwtToken';

const router = express.Router();

//Category
router.use('/category', verifyJwtToken, categoryRouter);

//Genre
router.use('/genre', verifyJwtToken, genreRouter);

//Author
router.use('/author', verifyJwtToken, authorRouter);

//Product
router.use('/product', verifyJwtToken, productRouter);

//User Type
router.use('/user_type', verifyJwtToken, userTypeRouter);

//User
router.use('/user', verifyJwtToken, userRouter);

//Auth
router.use('/auth', authRouter);

export default router;
