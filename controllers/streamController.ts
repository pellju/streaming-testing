import {Request, Response, NextFunction } from 'express';
import { streams, openingStream, deleteStream } from '../services/ffmpegService';
import { removeStreamDatabaseObject, createStreamDatabaseObject, findStreamsUserCanSee, findAllStreams } from '../services/streamDatabaseService';

const addStream = async (req: Request, res: Response, next: NextFunction) => {

    // Checking if required fields are given
    const body = req.body;
    if (body === undefined || body.input === undefined || body.name === undefined || body.category === undefined || body.permission === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        // ToDo: Add metadatainfo
        const input: string = body.input;
        const name: string = body.name;
        const disableTlsCheck: number = body.disableTlsCheck;
        const category: string = body.category;
        const permission: string = body.permission;

        let checkTls: boolean = false;
        if (disableTlsCheck === undefined || !disableTlsCheck) {
            checkTls = true;
        } 

        // Checking that name is unique (result is -1 if does not exist):
        // ToDo: Add a check to check if that exists in database
        if (streams.findIndex(steram => steram.streamname === name) > -1) {
            // ToDo: Improve error management and notify user that the stream with given name already exists
            res.status(400).json({ 'Error': 'Stream with given name already exists!' });
        } else {
            try {
                if (!openingStream(input, name, checkTls)) {
                    res.status(400).json({ 'Error': 'There was an error creating the stream!' });
                } else {
                    // If the stream object is properly created, create an item to database
                    // Todo: This should be confirmed
                    const streams = await createStreamDatabaseObject(name, input, category, permission);
                    res.status(201).send({ 'Information': 'Successfully created new stream!', 'streams': streams });
                }
            } catch (e: any) {
                    console.log("Error with adding stream to database!");
                    console.log(e.message);
                    res.status(500).json({ 'Error': 'Something wrong with adding the stream from database!'});
            }
        }
    }
};

const removeStream = async (req: Request, res: Response, next: NextFunction) => {
    const name: string = req.params.name;
    if (req.params === undefined || name === undefined) {
        res.status(400).json({ "Error": "Stream name not defined!" });
    } else {
        try {
            if (deleteStream(name)) {
                // ToDo: This should be confirmed 
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

const listStreamNames = async (req: Request, res: Response, next: NextFunction) => {
    const streamsFromDatabase = await findAllStreams();

    if (streamsFromDatabase.length === 0 || !streamsFromDatabase) {
        res.send({ "items": [] });
    } else {
        const streamList = streamsFromDatabase.map(item => item.name);
        res.send({ "items": streamList });
    }
};

export { listStreamNames, addStream, removeStream }