import express, {Router} from 'express';

import { userRegistration, userLogin, userLogout } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.get('/register', );

userRouter.get('/login', );

userRouter.post('/register', userRegistration);

userRouter.post('/lopgout', userLogout);

userRouter.post('/login', userLogin);

export { userRouter }