import express, { Express, Request, Response } from 'express';

const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.post('/test', (req: Request, res: Response) => {
    const body = req.body;

    if (body === undefined || body.input === undefined) {
        res.json({ 'Error': 'Incorrect body'});
    } else {
        res.json({ 'Info': 'Success' });
    }
    
});

app.listen(3000, () => {
    console.log("Server is running at http://127.0.0.1:3000 !");
});