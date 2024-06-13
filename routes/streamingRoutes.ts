import express, {Router} from 'express';

import { addStream, listStreamNames, removeStream } from '../controllers/streamController';
import { isAdmin } from '../middlewares/authJwt';

const streamingRouter: Router = express.Router();

streamingRouter.post('/newstream', isAdmin, addStream);

streamingRouter.get('/streams', listStreamNames);

streamingRouter.delete('/remove/:name', isAdmin, removeStream);

streamingRouter.post('/dev/newstream', addStream);

streamingRouter.get('/dev/streams', listStreamNames);

streamingRouter.delete('/dev/remove/:name', removeStream);

export { streamingRouter }