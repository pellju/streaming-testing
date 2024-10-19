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

const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.headers || !req.headers.authorization) {
        return res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const token: string = req.headers.authorization.toString();
            const extractedToken: string = token.split("Bearer ")[1]
            let user: userObjectContainingId = {id: null};
            jwt.verify(extractedToken, JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    throw new Error("Unauthorized");
                } else {
                    user = decoded as { id: string };
                }
            });

            if (!user || !user.id) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const userId: string = user.id;
                const findUserById = await db.User.findById(userId).populate('roles').exec();
                const roleIds: string[] | undefined = findUserById?.roles.map(role => role._id.toString());
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
            res.status(500).json({ 'Error': "An unknown authorization token detected!" });
        }
    }
};

const isFulluser = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.headers || !req.headers.authorization) {
        return res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const token: string = req.headers.authorization.toString();
            const extractedToken: string = token.split("Bearer ")[1]
            let user: userObjectContainingId = {id: null};
            jwt.verify(extractedToken, JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    throw new Error("Unauthorized");
                } else {
                    user = decoded as { id: string };
                }
            });

            if (!user || !user.id) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const userId: string = user.id;
                const findUserById = await db.User.findById(userId).populate('roles').exec();
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
            res.status(500).json({ 'Error': "An unknown authorization token detected!" });
        }
    }
};

const isUser = async (req: AuthRequest, res: Response, next: NextFunction) => {

    if (!req.headers || !req.headers.authorization) {
        return res.status(400).json({ 'Error': 'Token missing' });
    } else {
        try {
            const token: string = req.headers.authorization.toString();
            const extractedToken: string = token.split("Bearer ")[1]
            let user: userObjectContainingId = {id: null};
            jwt.verify(extractedToken, JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    throw new Error("Unauthorized");
                } else {
                    user = decoded as { id: string };
                }
            });

            if (!user || !user.id) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const userId: string = user.id;
                const findUserById = await db.User.findById(userId).populate('roles').exec();
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
            res.status(500).json({ 'Error': "An unknown authorization token detected!" });
        }
    }
};

export { isAdmin, isFulluser, isUser }