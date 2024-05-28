// Taken mostly from https://www.bezkoder.com/node-js-express-login-mongodb/


import { db } from "../models";
import { User } from "../models/user.model";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomBytes } from "crypto";
import { Role } from "../models/role.model";

const generateNewToken = (): string => {
    return randomBytes(48).toString('hex');
}

const signUp =  (username: string, password: string, invitecode: string) => {

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
            console.log("Error!");
            console.log(err);
            return false;
        }

        if (roles) {
            db.Role.find(
                {
                    name: { $in: roles }
                },
                (err: any, roles: any) => {
                    if (err) {
                        console.log("Error!");
                        console.log(err);
                        return false;
                    }

                    nuser.roles = roles.map((role: any) => role._id);
                    nuser.save((err: any) => {
                        if (err) {
                            console.log("Error!");
                            console.log(err);
                            return false;
                        }
                    });

                    console.log('User successfully registered!');
                    return true;
                }
            )
        }
    })
    
}