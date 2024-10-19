// This file needs to be re-written considering that API-keys are related to user-information

import {Request, Response } from 'express';
import { keys, addingApiKey, removeApiKey } from "../services/apiKeyService";

const addNewApiKey = (req: Request, res: Response) => {
    const body = req.body;

    if (body === undefined || body.key === undefined) {
        res.status(400).json({ 'Error': 'Incorrect body'});
    } else {
        try {
            if (keys.includes(body.key)) {
                res.status(400).json({ 'Error': 'API-key already added!' });
            } else {
                if (addingApiKey(body.key)) {
                    res.status(201).send({ 'Information': 'API-key successfully added!' });
                } else {
                    res.status(400).json({ 'Error': 'Error adding API-key!' });
                } 
            }
        } catch (e: any) {
            console.log('Error!');
            console.log(e.message);
            res.status(400).json({ 'Error': 'Error!' });
        }
    }
};

const deleteApiKey = (req: Request, res: Response) => {
    const key: string = req.params.apikey;
    if (key === undefined) {
        res.status(400).json({ 'Error': 'Key not found!'});
    } else {
        try {
            if (removeApiKey(key)) {
                res.send({ 'Information': 'Removal done!' });
            } else {
                res.status(400).json({ 'Error': 'Error removing key!'});
            }
        } catch (e: any) {
            console.log('Error!');
            console.log(e.message);
            res.status(400).json({ 'Error': 'Error removing key!'});
        };
    }
};

const listKeys = (req: Request, res: Response) => {
    res.send({ 'keys': keys });
}

export { addNewApiKey, deleteApiKey, listKeys }