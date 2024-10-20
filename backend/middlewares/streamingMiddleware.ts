import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../models/user.model';
import { db } from '../models';

const apiCheckerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const apikey: string = req.params.apikey;
    const suitableUser: UserInterface | null = await db.User.findOne({ apikey: apikey });

    if (suitableUser) {
        next();
    } else {
        res.status(403).send({ "Error": "Incorrect API-key!" });
    }
}

export { apiCheckerMiddleware }