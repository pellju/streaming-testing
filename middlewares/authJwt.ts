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
        token: { [key: string]: any };
    }
};

const verifyingToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: any = req.session.token;

    if (token) {
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

const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
        res.status(400).json({ 'Error': 'Token missing' });
    } else {
        db.User.findById(req.user.userId).exec((err: any, user: any) => {
            if (err) {
                res.status(500).json({ 'Error': err });
            }

            db.Role.find({
                _id: { in: user.roles },
            }, (role_err: any, roles: any) => {
                if (role_err) {
                    res.status(500).json({ 'Error': role_err });
                }
                
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return; // Improve
                    }
                }
                
                res.status(403).json({ 'Error': 'Forbidden. Admin-role required!' });
                return;
            })
        });
    }
};

const isFulluser = (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
        res.status(400).json({ 'Error': 'Token missing' });
    } else {
        db.User.findById(req.user.userId).exec((err: any, user: any) => {
            if (err) {
                res.status(500).json({ 'Error': err });
            }

            db.Role.find({
                _id: { in: user.roles },
            }, (role_err: any, roles: any) => {
                if (role_err) {
                    res.status(500).json({ 'Error': role_err });
                }
                
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "fulluser") {
                        next();
                        return; // Improve
                    }
                }
                
                res.status(403).json({ 'Error': 'Forbidden. Fulluser-role required!' });
                return;
            })
        });
    }
};

const isUser = (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.user) {
        res.status(400).json({ 'Error': 'Token missing' });
    } else {
        db.User.findById(req.user.userId).exec((err: any, user: any) => {
            if (err) {
                res.status(500).json({ 'Error': err });
            }

            db.Role.find({
                _id: { in: user.roles },
            }, (role_err: any, roles: any) => {
                if (role_err) {
                    res.status(500).json({ 'Error': role_err });
                }
                
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "user") {
                        next();
                        return; // Improve
                    }
                }
                
                res.status(403).json({ 'Error': 'Forbidden. User-role required!' });
                return;
            })
        });
    }
};

export { verifyingToken, isAdmin, isFulluser, isUser }