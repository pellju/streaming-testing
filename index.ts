import express, { Express, Request, Response } from 'express';
import path from 'path';

import { apiCheckerMiddleware } from './middlewares/streamingMiddleware';
import { addNewApiKey, deleteApiKey, listKeys } from './controllers/apiController';
import { addStream, listStreamNames, removeStream } from './controllers/streamController';

// Creating a new Express-server and allowing /stream-paths to access streams-folder (statically)
const app: Express = express();
app.use(express.json());

app.use('/secretstream/:apikey', apiCheckerMiddleware, express.static(path.join(__dirname, 'streams')));
app.use('/stream', express.static(path.join(__dirname, 'streams')));


app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.post('/newstream', addStream);

app.get('/streams', listStreamNames);

app.delete('/remove/:name', removeStream);

app.post('/newapikey', addNewApiKey);

app.delete('/apikeyremoval/:apikey', deleteApiKey);


app.get('/keys', listKeys);

// Running the application
app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});