import express, {Router} from 'express';

import { addStream, listStreamNames, removeStream, restartStream } from '../controllers/streamController';
import { isAdmin } from '../middlewares/authJwt';
import { checkIfTokenIsValid } from '../middlewares/authJwt';

const streamingRouter: Router = express.Router();

streamingRouter.post('/newstream', isAdmin, addStream);

streamingRouter.get('/streams', checkIfTokenIsValid, listStreamNames);

streamingRouter.delete('/remove/:name', isAdmin, removeStream);

streamingRouter.post('/restart/:stream', checkIfTokenIsValid, restartStream);


if (process.env.ENVIRONMENT == "DEV") {
    streamingRouter.post('/dev/newstream', addStream);

    streamingRouter.get('/dev/streams', listStreamNames);

    streamingRouter.delete('/dev/remove/:name', removeStream);

    streamingRouter.post('/dev/restart/:stream', restartStream);
}

export { streamingRouter }