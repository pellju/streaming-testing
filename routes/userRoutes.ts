import express, {Router} from 'express';

import { isAdmin } from '../middlewares/authJwt';
import { userRegistration, userLogin, userLogout, isAdminTest, getInvites, newInviteEndpoint, userEdit, userRemoval } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.get('/register', );

userRouter.get('/login', );

userRouter.post('/register', userRegistration);

userRouter.post('/logout', userLogout);

userRouter.post('/login', userLogin);

userRouter.get('/admintest', isAdmin, isAdminTest);

userRouter.post('/users/newinvite', isAdmin, newInviteEndpoint);

userRouter.get('/users/getInvites', isAdmin, getInvites);

userRouter.post('/users/edit/:id', isAdmin, userEdit);

userRouter.delete('/users/delete/:id', isAdmin, userRemoval);


if (process.env.ENVIRONMENT == "DEV") {
    userRouter.post('/dev/users/newinvite', newInviteEndpoint);

    userRouter.get('/dev/users/getInvites', getInvites);

    userRouter.post('/dev/users/edit/:id', userEdit);

    userRouter.delete('/dev/users/delete/:id', userRemoval);
}

export { userRouter }