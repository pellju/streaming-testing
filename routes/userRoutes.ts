import express, {Router} from 'express';

import { isAdmin } from '../middlewares/authJwt';
import { userRegistration, userLogin, userLogout, isAdminTest, getInvites, newInviteEndpoint } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.get('/register', );

userRouter.get('/login', );

userRouter.post('/register', userRegistration);

userRouter.post('/logout', userLogout);

userRouter.post('/login', userLogin);

userRouter.get('/admintest', isAdmin, isAdminTest);

userRouter.post('/users/newinvite', isAdmin, newInviteEndpoint);

userRouter.get('/users/getInvites', isAdmin, getInvites);

userRouter.post('/users/edit/:id', isAdmin, );

userRouter.delete('/users/delete/:id', isAdmin, );

// Development IDs endpoints
// Disable before taken into public

userRouter.post('/dev/users/newinvite', newInviteEndpoint);

userRouter.get('/dev/users/getInvites', getInvites);

userRouter.post('/users/edit/:id',  );

userRouter.delete('/users/delete/:id',  );

export { userRouter }