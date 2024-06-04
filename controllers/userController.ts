import {Request, Response } from 'express';
import { db } from "../models";
import { User } from '../models/user.model';
import { signUp, login, logout } from '../services/userService';

const userRegistration = async (req: Request, res: Response) => {
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


            const findingUser = await User.findOne({ username: username });
            if (findingUser) {
                res.status(400).json({ 'Error': 'User with given username exists!' });
            } else {
                return await signUp(req, res);
            }
            

        } catch (e: any) {
            console.log("Registration error!");
            console.log(e.message);
            res.status(500).json({ 'Error': 'Unknown error!'});
        }
    }
}

const userLogin = async (req: Request, res: Response) => {
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

            const findingUser = await User.findOne({ username: username });
            if (findingUser) {
                return await login(req, res);
            } else {
                res.status(400).json({ 'Error': 'User with given username does not exist!' });
            }
            
        } catch (e: any) {
            console.log("Registration error!");
            console.log(e.message);
            res.status(500).json({ 'Error': 'Unknown error!'});
        }
    }
}

const userLogout = async (req: Request, res: Response) => {
    try {
        return await logout(req,res);
    } catch (e: any) {
        console.log("Logout error!");
        console.log(e.message);
        res.status(500).json({ 'Error': 'Unknown error!'});
    }
}

const isAdminTest = async (req: Request, res: Response) => {
    res.send({"Information": "You are an admin!" });
}

export { userRegistration, userLogin, userLogout, isAdminTest }