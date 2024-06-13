import {Request, Response } from 'express';
import { streams, openingStream, deleteStream } from '../services/ffmpegService';
import { removeStreamDatabaseObject, createStreamDatabaseObject, findStreamsUserCanSee, findAllStreams } from '../services/streamDatabaseService';

const addStream = async (req: Request, res: Response) => {
    const body = req.body;
    if (body === undefined || body.input === undefined || body.name === undefined || body.category === undefined || body.permission === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        try {
            // ToDo: Check that input is valid URL!
            // ToDo: Add metadatainfo
            const input = body.input;
            const name = body.name;
            const category = body.category;
            const permission = body.permission;

            // Checking that name is unique (result is -1 if does not exist):
            // (There should not be database entry either then)
            if (streams.findIndex(stream => stream.streamname === name) > -1) {
                // ToDo: Improve error management and notify user that the stream with given name already exists
                res.status(400).json({ 'Error': 'Stream with given name already exists!' });
            } else {

                if (!openingStream(input, name)) {
                    res.status(400).json({ 'Error': 'There was an error opening the stream!' });
                } else {
                    // Create a database entry here
                    const streams = await createStreamDatabaseObject(name, input, category, permission);
                    res.status(201).send({ 'Information': 'Successfully created new stream!', 'streams': streams });
                }
            }
        } catch (e: any) {
            console.log("Error with adding stream to database!");
            console.log(e.message);
            res.status(500).json({ 'Error': 'Something wrong with adding the stream from database!'});
        }
    }
};

const removeStream = async (req: Request, res: Response) => {
    // ToDo: Sanitizing
    const name: string = req.params.name;
    if (req === undefined || name === undefined) {
        res.status(400).json({ "Error": "Stream name not defined!" });
    } else {
        try {
            if (deleteStream(name)) {
                const existingStreams = await removeStreamDatabaseObject(name);
                res.send({ "Information": "Stream deleted!", "Streams": existingStreams });
            } else {
                res.status(400).json({ "Error": "No such stream name!" });
            }
        } catch (e: any) {
            console.log("Error with removing stream to database!");
            console.log(e.message);
            res.status(500).json({ 'Error': 'Something wrong with removing the stream from database!'});
        }
    }
};

const listStreamNames = async (req: Request, res: Response) => {
    const streamsFromDatabase = await findAllStreams();

    if (streamsFromDatabase.length === 0 || !streamsFromDatabase) {
        res.send({ "items": [] });
    } else {
        const streamList = streamsFromDatabase.map(item => item.name);
        res.send({ "items": streamList });
    }
};

export { listStreamNames, addStream, removeStream }