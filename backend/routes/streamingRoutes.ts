import express, {Router} from 'express';

import { addStream, listStreamNames, removeStream } from '../controllers/streamController';
import { isAdmin } from '../middlewares/authJwt';
import { checkIfTokenIsValid } from '../middlewares/authJwt';

const streamingRouter: Router = express.Router();

streamingRouter.post('/newstream', isAdmin, addStream);

streamingRouter.get('/streams', listStreamNames, checkIfTokenIsValid);

streamingRouter.delete('/remove/:name', isAdmin, removeStream);


if (process.env.ENVIRONMENT == "DEV") {
    streamingRouter.post('/dev/newstream', addStream);

    streamingRouter.get('/dev/streams', listStreamNames);

    streamingRouter.delete('/dev/remove/:name', removeStream);
}

export { streamingRouter }