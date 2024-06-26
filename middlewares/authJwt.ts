import jwt from 'jsonwebtoken';
import { db } from '../models';
import { Request, Response, NextFunction } from 'express';

require('dotenv').config();

const JWT_SECRET = process.env.COOKIETOKENSECRET;
console.log(JWT_SECRET);

if (!JWT_SECRET) {
    throw new Error('Missing JWT secret!');
};

type userObjectContainingId = {
    id: string | null;
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

    if (!req.headers || !req.headers.token) {
        return res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const token = req.headers.token.toString();
            let user: userObjectContainingId = {id: null};
            jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {

                if (err) {
                    return res.status(401).json({ 'Error': 'Unauthorized access!' });
                }
                user = decoded as { id: string };
            });

            if (!user) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const userId = user.id;
                const findUserById = await db.User.findById(userId);
                const roleIds = findUserById?.roles.map(role => role._id.toString());

                if (roleIds) {
                    for (let i: number =0; i < roleIds?.length; i++) {
                        const role = await db.Role.findById(roleIds[i]);
                        if (role?.name === "admin") {
                            next();
                            return ;
                        }
                    }
                }

                return res.status(403).json({ 'Error': 'Forbidden. Admin-role required!' });
            }
        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': e.message });
        }
    }
};

const isFulluser = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.headers || !req.headers.token) {
        return res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const token = req.headers.token.toString();
            let user: userObjectContainingId = {id: null};
            jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {

                if (err) {
                    return res.status(401).json({ 'Error': 'Unauthorized access!' });
                }
                user = decoded as { id: string };
            });

            if (!user) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const userId = user.id;
                const findUserById = await db.User.findById(userId);
                const roleIds = findUserById?.roles.map(role => role._id.toString());

                if (roleIds) {
                    for (let i: number =0; i < roleIds?.length; i++) {
                        const role = await db.Role.findById(roleIds[i]);
                        if (role?.name === "fulluser") {
                            next();
                            return ;
                        }
                    }
                }

                return res.status(403).json({ 'Error': 'Forbidden. Fulluser-role required!' });
            }
        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': e.message });
        }
    }
};

const isUser = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.headers || !req.headers.token) {
        return res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const token = req.headers.token.toString();
            let user: userObjectContainingId = {id: null};
            jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {

                if (err) {
                    return res.status(401).json({ 'Error': 'Unauthorized access!' });
                }
                user = decoded as { id: string };
            });

            if (!user) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const userId = user.id;
                const findUserById = await db.User.findById(userId);
                const roleIds = findUserById?.roles.map(role => role._id.toString());

                if (roleIds) {
                    for (let i: number =0; i < roleIds?.length; i++) {
                        const role = await db.Role.findById(roleIds[i]);
                        if (role?.name === "user") {
                            next();
                            return ;
                        }
                    }
                }

                return res.status(403).json({ 'Error': 'Forbidden. User-role required!' });
            }
        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': e.message });
        }
    }
};

export { verifyingToken, isAdmin, isFulluser, isUser }