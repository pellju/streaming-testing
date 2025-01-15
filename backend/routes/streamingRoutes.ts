import express, {Router} from 'express';

import { addStream, listStreamNames, removeStream } from '../controllers/streamController';
import { isAdmin } from '../middlewares/authJwt';
import { checkIfTokenIsValid } from '../middlewares/authJwt';

const streamingRouter: Router = express.Router();

streamingRouter.post('/newstream', isAdmin, addStream);

streamingRouter.get('/streams', checkIfTokenIsValid, listStreamNames);

streamingRouter.delete('/remove/:name', isAdmin, removeStream);

streamingRouter.put('/restart/:stream', checkIfTokenIsValid, ); // Add the controller function


if (process.env.ENVIRONMENT == "DEV") {
    streamingRouter.post('/dev/newstream', addStream);

    streamingRouter.get('/dev/streams', listStreamNames);

    streamingRouter.delete('/dev/remove/:name', removeStream);

    streamingRouter.put('/restart/:stream', ) // Add the controller function
}

export { streamingRouter }