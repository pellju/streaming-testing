import express, {Router} from 'express';

import { isAdmin } from '../middlewares/authJwt';
import { userRegistration, userLogin, userLogout, isAdminTest } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.get('/register', );

userRouter.get('/login', );

userRouter.post('/register', userRegistration);

userRouter.post('/logout', userLogout);

userRouter.post('/login', userLogin);

userRouter.get('/admintest', isAdmin, isAdminTest);

export { userRouter }