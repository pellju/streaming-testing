import {Request, Response } from 'express';
import { streams, openingStream, deleteStream } from '../services/ffmpegService';

const addStream = (req: Request, res: Response) => {
    const body = req.body;
    if (body === undefined || body.input === undefined || body.name === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        // ToDo: Check that input is valid URL!
        // ToDo: Add metadatainfo
        const input = body.input;
        const name = body.name;

        // Checking that name is unique (result is -1 if does not exist):
        if (streams.findIndex(steram => steram.streamname === name) > -1) {
            // ToDo: Improve error management and notify user that the stream with given name already exists
            res.status(400).json({ 'Error': 'Stream with given name already exists!' });
        } else {

            if (!openingStream(input, name)) {
                res.status(400).json({ 'Error': 'There was an error opening the stream!' });
            } else {
                res.status(201).send({ 'Information': 'Successfully created new stream!' });
            }
        }
    }
};

const removeStream = (req: Request, res: Response) => {
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
};

const listStreamNames = (req: Request, res: Response) => {
    const streamList: string[] = streams.map(item => item.streamname);
    res.send({ "items": streamList });
};

export { listStreamNames, addStream, removeStream }