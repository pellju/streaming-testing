import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import { apiCheckerMiddleware } from './middlewares/streamingMiddleware';
import { streamingRouter } from './routes/streamingRoutes';
import { userRouter } from './routes/userRoutes';

// For connecting to the database:
import { db } from './models';

require('dotenv').config();

(async () => {
    await db.roleCreation();
})();

// Creating a new Express-server and allowing /stream-paths to access streams-folder (statically)
const app: Express = express();
app.use(express.json());

if (!process.env.COOKIETOKENSECRET) {
    console.log("Set token!");
    process.exit(1);
}

app.use(session({
    secret: process.env.COOKIETOKENSECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use('/secretstream/:apikey', apiCheckerMiddleware, express.static(path.join(__dirname, 'streams')));
if (process.env.ENVIRONMENT == "DEV") {
    app.use('/stream', express.static(path.join(__dirname, 'streams')));
}



app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.use(streamingRouter);
app.use(userRouter);
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});