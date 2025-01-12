import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { apiCheckerMiddleware } from './middlewares/streamingMiddleware';
import { streamingRouter } from './routes/streamingRoutes';
import { userRouter } from './routes/userRoutes';

// For connecting to the database:
import { db } from './models';

// Importing https and fs for DEVELOPMENT-ENVIRONMENT TLS:
import fs from 'fs';
import https from 'https';

require('dotenv').config();

(async () => {
    await db.roleCreation();
})();

// Creating a new Express-server and allowing /stream-paths to access streams-folder (statically)
const app: Express = express();
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true
}));
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

/*if (process.env.ENVIRONMENT == "DEV") {

    const options = {
        key: fs.readFileSync('./certificates/server.key'),
        cert: fs.readFileSync('./certificates/server.crt')
    }

    https.createServer(options, app).listen(3000, () => {
        console.log("Server is running at https://127.0.0.1:3000 !");
    })
} else {*/
app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});
//}

