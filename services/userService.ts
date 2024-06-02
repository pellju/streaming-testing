// Taken mostly from https://www.bezkoder.com/node-js-express-login-mongodb/


import { db } from "../models";
import { User } from "../models/user.model";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from "crypto";
import { Role } from "../models/role.model";
import {Request, Response } from 'express';

declare module 'express-session' {
    export interface SessionData {
        token: { [key: string]: any };
    }
};

const generateNewToken = (): string => {
    return randomBytes(48).toString('hex');
}

const signUp =  (req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password;

    // Add type
    const newUser = new db.User({
        username: username,
        password: bcrypt.hashSync(password, 10),
        apikey: generateNewToken()
    });

    // Add type
    const roles = ['admin', 'fulluser', 'user', 'limiteduser'];

    // Change that the Role is not admin only i.e. including all the classes
    // Change return falses to another values...
    newUser.save((err: any, nuser: any) => {
        if (err) {
            console.log('Error:');
            console.log(err);
            res.status(500).json({ "Error": "Error when starting saving the user!" });
        }

        if (roles) {
            db.Role.find(
                {
                    name: { $in: roles }
                },
                (err: any, roles: any) => {
                    if (err) {
                        console.log('Error:');
                        console.log(err);
                        res.status(500).json({ "Error": "Error finding the user!" });
                    }

                    nuser.roles = roles.map((role: any) => role._id);
                    nuser.save((err: any) => {
                        if (err) {
                            console.log('Error:');
                            console.log(err);
                            res.status(500).json({ "Error": "Error when saving the user!" });
                        }
                    });

                    console.log('User successfully registered!');
                    return true;
                }
            )
        }
    })
    
};

const login =  (req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password;

    db.User.findOne({
        username: username,
    })
        .populate("roles", "-__v")
        .exec((err: any, user: any) => {
            if (err) {
                console.log("Error!");
                console.log(err);
                res.status(500).json({ "Error": "Some error found when logging in!"});
            }

            if (!user) {
                console.log("User not found!");
                res.status(401).json({ "Error": "Username or password incorrect!" });
            }

            const checkUserPassword = bcrypt.compareSync(password, user.password);

            if (!checkUserPassword) {
                console.log("Incorrect password");
                res.status(401).json({ "Error": "Username or password incorrect!" });
            }
            
            if (!process.env.COOKIETOKENSECRET) {
                console.log("SET COOKIETOKENSECRET!");
                res.status(500).json({ "Error": "A serverside error!" });
            } else {
                const token = jwt.sign({ id: user.id }, process.env.COOKIETOKENSECRET, {algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400,});

                const roles = [];
                for (let i = 0; i < user.roles.length; i++) {
                    roles.push(user.roles[i].name.toLowerCase());
                }

                req.session.token = {key: token};

                res.status(200).send({
                    id: user._id,
                    username: user.username,
                    roles: roles,
                    apikey: user.apikey,
                });
            }

            
        })
}

export { signUp, login }