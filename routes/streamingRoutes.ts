import express, {Router} from 'express';

import { addStream, listStreamNames, removeStream } from '../controllers/streamController';

const streamingRouter: Router = express.Router();

streamingRouter.post('/newstream', addStream);

streamingRouter.get('/streams', listStreamNames);

streamingRouter.delete('/remove/:name', removeStream);

export { streamingRouter }