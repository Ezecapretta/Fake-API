import { Router } from 'express';
import { signIn, signUp } from './auth.controller';

const authRouter = Router();

//Auth
authRouter.post('/login', signIn);
authRouter.post('/register', signUp);

export default authRouter;
