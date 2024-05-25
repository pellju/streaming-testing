import express, {Router} from 'express';

import { addNewApiKey, listKeys, deleteApiKey } from '../controllers/apiController';

const apiRouter: Router = express.Router();

apiRouter.post('/newapikey', addNewApiKey);

apiRouter.delete('/apikeyremoval/:apikey', deleteApiKey);

apiRouter.get('/keys', listKeys);

export { apiRouter }