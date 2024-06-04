// Mostly taken from https://www.bezkoder.com/node-js-express-login-mongodb/

import jwt from 'jsonwebtoken';
import { db } from '../models';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.COOKIETOKENSECRET;

if (!JWT_SECRET) {
    throw new Error('Missing JWT secret!');
};

interface AuthRequest extends Request {
    user?: { userId: string };
}

declare module 'express-session' {
    export interface SessionData {
        token?: { [key: string]: any };
    }
};

const verifyingToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: any = req.session.token?.key;

    if (!token) {
        res.status(403).json({ 'Error': 'No token provided!' })
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ 'Error': 'Unauthorized access!' });
        }
        req.user = decoded as { userId: string };
        next();
    });
};

const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user || !req.user.userId) {
        res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const findUserById = await db.User.findById(req.user.userId);

            const userRoles = await db.Role.find({ _id: { in: findUserById?.roles} });

            for (let i = 0; i < userRoles.length; i++) {
                if (userRoles[i].name === "admin") {
                    next();
                }
            }

            res.status(403).json({ 'Error': 'Forbidden. Admin-role required!' });

        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': e.message });
        }
    }
};

const isFulluser = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
        res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const findUserById = await db.User.findById(req.user.userId);

            const userRoles = await db.Role.find({ _id: { in: findUserById?.roles} });

            for (let i = 0; i < userRoles.length; i++) {
                if (userRoles[i].name === "fulluser") {
                    next();
                }
            }

            res.status(403).json({ 'Error': 'Forbidden. Fulluser-role required!' });

        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': e.message });
        }
    }
};

const isUser = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
        res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const findUserById = await db.User.findById(req.user.userId);

            const userRoles = await db.Role.find({ _id: { in: findUserById?.roles} });

            for (let i = 0; i < userRoles.length; i++) {
                if (userRoles[i].name === "fulluser") {
                    next();
                }
            }

            res.status(403).json({ 'Error': 'Forbidden. User-role required!' });

        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': e.message });
        }
    }
};

export { verifyingToken, isAdmin, isFulluser, isUser }