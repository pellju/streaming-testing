import { db } from "../models";
import { User, UserInterface } from "../models/user.model";
import { extractUserFromToken } from "../utils/extractUserFromToken";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from "crypto";
import {Request, Response } from 'express';

declare module 'express-session' {
    interface SessionData {
        token?: { [key: string]: any };
    }
};


const generateNewToken = (): string => {
    return randomBytes(48).toString('hex');
}

const signUp = async (req: Request, res: Response) => {

    console.log('bodycheck');
    const username: string = req.body.username;
    const password: string = req.body.password;

    try {
        console.log('creating user object');
        const newUser = new db.User({
            username: username,
            password: bcrypt.hashSync(password, 10),
            apikey: generateNewToken()
        });

        const roles = db.ROLES;

        console.log('saving user...');
        const savedUser = await newUser.save();
        const numberOfUsers: number = await User.countDocuments({});

        console.log('roles');
        if (roles) {
            console.log('roles: finding roles');
            try {
                const findingRoles = await db.Role.find({
                    name: { $in: roles }
                }).exec();
                
                console.log('roles: saving roles');
                // If the user is the first user in the system, saved above before defining "numberOfUsers"
                if (numberOfUsers === 1) {
                    savedUser.roles = findingRoles.map((role: any) => role._id);
                } else {
                    // Hardcoded, create a better solution
                    savedUser.roles = findingRoles.filter((role: any) => role.name === 'limited').map((role: any) => role._id);
                }
                
                await savedUser.save();
                console.log('User successfully registered!');
                res.status(201).json({ message: 'User successfully registered!' });

            } catch (er: any) {
                console.log("Error");
                console.log(er.message);
                res.status(500).json({ "Error": "Error finding the user!" });
            }
        }
    } catch (e: any) {
        console.log("Error");
        console.log(e.message);
        res.status(500).json({ "Error": "Error when starting saving the user!" });
    }    
};

const login = async (req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser: UserInterface | null = await db.User.findOne({ username: username }).populate("roles", "-__v");
        
        if (!existingUser || !existingUser.password) {
            res.status(401).json({ "Error": "Username or password incorrect!" });
        } else {
            const checkUserPassword = bcrypt.compareSync(password, existingUser?.password);

            if (!checkUserPassword) {
                res.status(401).json({ "Error": "Username or password incorrect!" });
            } else {

                if (!process.env.COOKIETOKENSECRET) {
                    console.log("SET COOKIETOKENSECRET!");
                    res.status(500).json({ "Error": "A serverside error!" });
                } else {
                    const token = jwt.sign({ id: existingUser._id }, process.env.COOKIETOKENSECRET, {algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 3600,});
                    //req.session.token = { key: token };

                    const roles = [];
                    for (let i = 0; i < existingUser.roles.length; i++) {
                        roles.push(existingUser.roles[i]);
                    }
                    //res.setHeader('Authorization', `Bearer ${token}`);

                    if (process.env.ENVIRONMENT == "DEV") { // Checking if this is about development environment -> allowing setting the cookie using HTTP
                        res.cookie('auth_token', `Bearer ${token}`, { httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 1000 })
                    } else {
                        res.cookie('auth_token', `Bearer ${token}`, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 1000 })
                    }
                    
                    res.status(200).send({
                        id: existingUser._id,
                        username: existingUser.username,
                        roles: roles,
                        apikey: existingUser.apikey,
                    });
                }
            }
        }
        
    } catch (e: any) {
        console.log("Error logging in!");
        console.log(e.message);
        return res.status(500).json({ "Error": "Error logging in!" });
    }
}

const logout = async(req: Request, res: Response) => {
    try {
        if (req.cookies.auth_token) {
            if (process.env.ENVIRONMENT == "DEV") {
                res.clearCookie('auth_token', { httpOnly: true, sameSite: 'strict'});
            } else {
                res.clearCookie('auth_token', { httpOnly: true, secure: true, sameSite: 'strict'});
            }
            return res.send({ 'Information': 'Logout successful' });
        } else {
            return res.send({ 'Information': 'Logout failed: not logged in.' });
        }
        
    } catch (e: any) {
        console.log("Error logging out!");
        console.log(e.message);
        return res.status(500).json({ "Error": "Error logging out!" });
    }
}

const editUser = async(req: Request, res: Response) => {

    // Already checked in controller that these exist
    const userId = req.params.id;
    const newPassword = req.body.password;
    const newClass = req.body.class;

    try {

        const checkIfUserExists = await User.exists({ _id: userId })
        if (!checkIfUserExists) {
            throw new Error ('User does not exist');
        }

        if (newPassword) {
            // Add function to update password, triggered if the password exists
        }

        if (newClass) {
            // Add function to update a new class. This should add the class to the existing ones
        }

        // Consider what could be the proper value for returning 

    } catch (e: any) {
        console.log('Problem with editUser in userService');
        console.log(e.message);
        return res.status(400).json({ 'Error': 'There was an error checking that the user exists / modifying it' });
    }
}

const renewingAPIkey = async (req: Request, res: Response) => {
    // The idea is that the user can renew their API-key using this function.
    // Basically, the authorization has been done already at this point
    if (!req.cookies || !req.cookies.auth_token) {
        return res.status(401).json({ 'Error': 'Token missing' });
    } else {
        try {
            const userID: string | null = extractUserFromToken(req.cookies.auth_token.toString());
            if (!userID) {
                return res.status(500).json({ "Error": "Error with the authorization "});
            } else {
                const newAPIkey: string = generateNewToken();
                const user = await db.User.findById(userID);
                if (user) {
                    user.apikey = newAPIkey;
                    await user.save();
                    return res.status(200).send({ 'Information': 'API-key changed successfully', 'apikey': newAPIkey });
                } else {
                    throw new Error('Unknown user-related error!');
                }
            }
        } catch (e: any) {
            console.log("Error!");
            console.log(e.message);
            res.status(500).json({ 'Error': "An unknown authorization token detected!" });
        }
    }
}

export { signUp, login, logout, editUser, renewingAPIkey }