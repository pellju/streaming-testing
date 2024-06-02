import {Request, Response } from 'express';
import { db } from "../models";
import { User } from '../models/user.model';
import { signUp, login } from '../services/userService';

const userRegistration = (req: Request, res: Response) => {
    const body = req.body;
    const username: string = body.username;
    const password: string = body.password;
    const invitecode: string = body.invitecode; // Create a simple check afterwards that if the userDatabase is empty, a separate invite code for the first user

    if (body === undefined) {
        return res.status(400).json({ 'Error': 'Missing registration data!'});
    } else if (username === undefined) {
        return res.status(400).json({ 'Error': 'Missing username!'});
    } else if (password === undefined) {
        return res.status(400).json({ 'Error': 'Missing password!'});
    } else if (invitecode === undefined) {
        return res.status(400).json({ 'Error': 'Missing invitecode!'});
    } else {
        try {

            // Set types better:
            User.findOne({ username: username }).exec().then(user => {
                if (user) {
                    res.status(400).json({ 'Error': 'User with given username exists!' });
                }
            });

            // Add registration function here
            return signUp(req, res);

        } catch (e: any) {
            console.log("Registration error!");
            console.log(e.message);
            res.status(500).json({ 'Error': 'Unknown error!'});
        }
    }
}

const userLogin = (req: Request, res: Response) => {
    const body = req.body;
    const username: string = body.username;
    const password: string = body.password;

    if (body === undefined) {
        return res.status(400).json({ 'Error': 'Login registration data!'});
    } else if (username === undefined) {
        return res.status(400).json({ 'Error': 'Missing username!'});
    } else if (password === undefined) {
        return res.status(400).json({ 'Error': 'Missing password!'});
    } else {
        try {

            // Set types better:
            User.findOne({ username: username }).exec().then(user => {
                if (user) {
                    login(req, res);
                } else {
                    res.status(400).json({ 'Error': 'Username not found' });
                }
            })
            
            return login(req, res);
            
        } catch (e: any) {
            console.log("Registration error!");
            console.log(e.message);
            res.status(500).json({ 'Error': 'Unknown error!'});
        }
    }
}

export { userRegistration, userLogin }