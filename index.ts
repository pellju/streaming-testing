import express, { Express, Request, Response } from 'express';
import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg';
import path from 'path';

// Creating a new Express-server and allowing /stream-paths to access streams-folder (statically)
const app: Express = express();
app.use(express.json());
app.use('/stream', express.static(path.join(__dirname, 'streams')));

// ToDo: change these away
let input: string = 'test';
let name: string = 'test';

// Defining custom type for the combination of Strings (names) and Ffmpegs
type streaminfo = {
    streamname: string;
    streamobject: FfmpegCommand;
}

// ToDo: use MongoDB or MariaDB or PostgreSQL instead of array
let streams: streaminfo[] = [];

app.get('/', (req: Request, res: Response) => {
    console.log(streams);
    res.send('Hello world!');
});

app.post('/test', (req: Request, res: Response) => {
    const body = req.body;

    // ToDo: check that input is a URL and contains .m3u or .m3u8 as type 
    if (body === undefined || body.input === undefined || body.name === undefined) {
        res.json({ 'Error': 'Incorrect body'});
    } else {
        // ToDo: sanitize name and input?
        // Also: add a check to see that if the name exists already, then do not add the channel, but result in error
        input = body.input;
        name = body.name;
        try {
            // Generating stream object
            const stream: FfmpegCommand = ffmpeg(input)
            .addOption('-c', 'copy')
            .addOption('-f', 'hls')
            .addOption('-hls_time', '10')
            .addOption('-hls_list_size', '3')
            .addOption('-hls_delete_threshold', '3')
            .addOption('-hls_flags delete_segments')
            .on('error', function(err) {
                console.log('Following error:');
                console.log(err.message);
            })
            .save(__dirname + '/streams/' + name + '.m3u8');

            // Combning the stream name and stream object and pushing it to the list
            const streamCombination: streaminfo = {
                streamname: name,
                streamobject: stream
            };
            streams.push(streamCombination);

            res.send({ 'Information': "Test works!"});
        } catch(e: any) {
            console.log('Error!');
            console.log(e.message);
            res.send({'Error': 'There are some issues with ffmpeg!'});
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
        const streamInfoObject: streaminfo | undefined = streams.find(item => item.streamname === name) || undefined;
        if (streamInfoObject) {
            // Getting the streaminfo-object used which is supposed to be removed
            const removableItemIndex: number = streams.findIndex(item => item.streamname === name);
            streams[removableItemIndex].streamobject.kill('SIGINT');
            streams.splice(removableItemIndex, 1);

            res.send({ "Information": "Success!"});
        } else {
            res.status(400).json({ "Error": "No such stream name!" })
        }
    }
});

app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});