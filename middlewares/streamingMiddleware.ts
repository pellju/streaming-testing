import { Request, Response, NextFunction } from 'express';
import { checkKey } from '..';

// Creating a middleware to check the 
const apiCheckerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apikey: string = req.params.apikey;
    const existing: boolean = checkKey(apikey); 
    if (existing) {
        next();
    } else {
        res.status(403).send({ "Error": "Incorrect API-key!" });
    }
};

export { apiCheckerMiddleware }