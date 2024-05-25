import express, { Express, Request, Response } from 'express';
import path from 'path';

import { apiCheckerMiddleware } from './middlewares/streamingMiddleware';
import { streamingRouter } from './routes/streamingRoutes';
import { apiRouter } from './routes/apiRoutes';

// Creating a new Express-server and allowing /stream-paths to access streams-folder (statically)
const app: Express = express();
app.use(express.json());

app.use('/secretstream/:apikey', apiCheckerMiddleware, express.static(path.join(__dirname, 'streams')));
app.use('/stream', express.static(path.join(__dirname, 'streams')));


app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.use(streamingRouter);
app.use(apiRouter);

app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});