import express, { Express, Request, Response } from 'express';
import path from 'path';

import { apiCheckerMiddleware } from './middlewares/streamingMiddleware';
import { openingStream, streams, deleteStream } from './services/ffmpegService';
import { keys, addingApiKey, removeApiKey } from './services/apiKeyService';

// Creating a new Express-server and allowing /stream-paths to access streams-folder (statically)
const app: Express = express();
app.use(express.json());

app.use('/secretstream/:apikey', apiCheckerMiddleware, express.static(path.join(__dirname, 'streams')));
app.use('/stream', express.static(path.join(__dirname, 'streams')));

// ToDo: change these away
let input: string = 'test';
let name: string = 'test';


app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.post('/test', (req: Request, res: Response) => {
    const body = req.body;

    // ToDo: check that input is a URL and contains .m3u or .m3u8 as type 
    if (body === undefined || body.input === undefined || body.name === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        // ToDo: sanitize name and input?
        // Also: add a check to see that if the name exists already, then do not add the channel, but result in error
        input = body.input;
        name = body.name;
        try {
            if (!openingStream(input, name)) {
                throw new Error ('Issues with ffmpeg!');
            };

            res.send({ 'Information': "Test works!"});
        } catch(e: any) {
            res.status(400).json({'Error': 'There are some issues with ffmpeg!'});
        }
    }
});

app.get('/test', (req: Request, res: Response) => {
    if (input === 'test') {
        res.status(400).json({ 'Error': 'Please change the input first!' });
    } else {
        res.send({ 'Information': "Success"});
    }
});

// ToDo: Add whole addresses, not just names!
app.get('/streams', (req: Request, res: Response) => {
    const newItems: string[] = streams.map(item => item.streamname);
    res.send({"items": newItems});

});

app.delete('/remove/:name', (req: Request, res: Response) => {
    // ToDo: Sanitizing
    const name: string = req.params.name;
    if (req === undefined || name === undefined) {
        res.status(400).json({ "Error": "Stream name not defined!" });
    } else {
        if (deleteStream(name)) {
            res.send({ "Information": "Stream deleted!" });
        } else {
            res.status(400).json({ "Error": "No such stream name!" });
        }
    }
});

// These are just for testing purposes
app.post('/newapikey', (req: Request, res: Response) => {
    const body = req.body;

    // ToDo: check that input is a URL and contains .m3u or .m3u8 as type 
    if (body === undefined || body.key === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        if (addingApiKey(body.key)) {
            res.send({ 'Information': 'Added a new API-key!'});
        } else {
            res.status(400).json({ 'Error': 'Error adding new API-key' });
        }
        
    }
});

app.delete('/apikeyremoval/:apikey', (req: Request, res: Response) => {
    const key: string = req.params.apikey;
    if (key === undefined) {
        res.status(400).json({ 'Error': 'Key not found!'});
    } else {
        if (removeApiKey(key)) {
            res.send({ 'Information': 'Removal done!' });
        } else {
            res.status(400).json({ 'Error': 'Error removing key!'});
        }
        
    }
});

app.get('/keys', (req: Request, res: Response) => {
    res.send({ 'keys': keys });
})

// Running the application
app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});