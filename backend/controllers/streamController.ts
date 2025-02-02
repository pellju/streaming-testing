import {Request, Response, NextFunction } from 'express';
import { streams, openingStream, deleteStream, restartingStream } from '../services/ffmpegService';
import { removeStreamDatabaseObject, createStreamDatabaseObject, findStreamsUserCanSee, findAllStreams, fetchStreamObjectFromDatabase } from '../services/streamDatabaseService';
import { db } from '../models';
import { StreamInterface } from '../models/stream.model';

const addStream = async (req: Request, res: Response, next: NextFunction) => {

    // Checking if required fields are given
    const body = req.body;
    if (body === undefined || body.input === undefined || body.name === undefined || body.realname === undefined || body.category === undefined || body.permission === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        // ToDo: Add metadatainfo
        const input: string = body.input;
        const name: string = body.name;
        const realName: string = body.realname;
        const disableTlsCheck: number = body.disableTlsCheck;
        const category: string = body.category;
        const permission: string = body.permission;

        let checkTls: boolean = false;
        if (disableTlsCheck === undefined || !disableTlsCheck) {
            checkTls = true;
        } 

        const checkingIfStreamExists: StreamInterface | null = await db.Stream.findOne({ name: name });
        if (checkingIfStreamExists) {
            return res.status(400).json({ 'Error': 'A stream with given name already exists!' });
        }

        // Checking that name is unique (result is -1 if does not exist):
        if (streams.findIndex(steram => steram.streamname === name) > -1) {
            res.status(400).json({ 'Error': 'Stream with given name already exists!' });
        } else {
            try {
                if (!openingStream(input, name, checkTls)) {
                    res.status(400).json({ 'Error': 'There was an error creating the stream!' });
                } else {
                    // If the stream object is properly created, create an item to database                    
                    const streams: StreamInterface[] | null = await createStreamDatabaseObject(name, realName, input, category, permission, disableTlsCheck);
                    // Checking if the newly created item exists there:
                    // If exists, confirm that everything works, but if not, remove the stream and tell user that there has been an error
                    const checkingStreamCheck: StreamInterface | null = await db.Stream.findOne({ name: name });
                    if (checkingStreamCheck) {
                        res.status(201).send({ 'Information': 'Successfully created new stream!', 'streams': streams });
                    } else {
                        deleteStream(name);
                        res.status(400).send({ 'Error': 'Threre was an error saving stream item to the database.' })
                    }
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
                const existingStreams: StreamInterface[] | null = await removeStreamDatabaseObject(name);
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
    const streamsFromDatabase: StreamInterface[] | null = await findAllStreams();

    if (streamsFromDatabase.length === 0 || !streamsFromDatabase) {
        res.send({ "items": [] });
    } else {

        //ToDo: Check here from the request that what is the auth-token, get the user from it, and fetch all the proper streams
        const streamList = streamsFromDatabase.map(item => ({ name: item.name, realname: item.realName, category: item.category}));
        res.send(streamList);
    }
};

const restartStream = async (req: Request, res: Response, next: NextFunction) => {
    const stream: string = req.params.stream;
    if (req.params === undefined || stream === undefined) {
        res.status(400).json({ "Error": "Stream name defined!" });
    } else {
        // the deleteStream should be conditional, i.e. if there are less than X minutes, the stream won't be deleted
        const infos: StreamInterface | null = await fetchStreamObjectFromDatabase(stream); // ToDo: a proper type
        if (!infos) {
            res.status(400).json({ "Error": "Issues finding the stream! "});
        } else {
            const existingTime: number = (new Date(infos.lastStart)).getTime();
            const currentTime: number = Date.now();
            //console.log(infos.lastStart);
            if (currentTime - existingTime > 2*60*1000) {
            
                if (deleteStream(stream)) {
                    if (infos) {
                        const restart = await restartingStream(infos);
                        if (restart) {
                            res.status(201).json({ "Information" : "Success!"});
                        } else {
                            res.status(400).json({ "Error": "Error restarting stream" });
                        }
                        
                    } else {
                        res.status(400).json({ "Error": "Failed fetching the metadata of the stream!" });
                    }
                } else {
                    res.status(400).json({ "Error": "Failed delete the existing stream!" });
                }
            } else {
                res.status(400).json({ "Error": "Failed to restart the stream: not enough time since the last restart!"});
            }
        }
    }
}

export { listStreamNames, addStream, removeStream, restartStream }