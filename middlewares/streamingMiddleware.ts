// This file needs to be re-written because the API-key is User-related

import { Request, Response, NextFunction } from 'express';
import { checkKey } from '../services/apiKeyService';

// Creating a middleware to check the 
const apiCheckerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const apikey: string = req.params.apikey;
    const existing: boolean = await checkKey(apikey); 
    if (existing) {
        next();
    } else {
        res.status(403).send({ "Error": "Incorrect API-key!" });
    }
};

export { apiCheckerMiddleware }