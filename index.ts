import express, { Express, Request, Response } from 'express';
import ffmpeg, {FfmpegCommand} from 'fluent-ffmpeg';
import path from 'path';

const app: Express = express();
app.use(express.json());
app.use('/stream', express.static(path.join(__dirname, 'streams')));

var input: string = 'test';

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.post('/test', (req: Request, res: Response) => {
    const body = req.body;

    if (body === undefined || body.input === undefined) {
        res.json({ 'Error': 'Incorrect body'});
    } else {
        input = body.input;
        try {
            ffmpeg(input)
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
            .save(__dirname + '/streams/testing.m3u8');
            res.send({ 'Information': "Test works!"});
        } catch(e: any) {
            console.log('Error!');
            console.log(e.message);
            res.send({'Error': 'There are some issues with ffmprg!'});
        }
    }
    
});

app.get('/test', (req: Request, res: Response) => {
    if (input === 'test') {
        res.status(400).json({ 'Error': 'Please change the input first!' });
    } else {
        res.send({ 'Information': "Success"});
    }
})

app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});