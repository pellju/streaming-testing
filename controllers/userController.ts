import {Request, Response } from 'express';
import { db } from "../models";
import { User } from '../models/user.model';
import { signUp, login, logout } from '../services/userService';
import { createNewInvite, listInvites, removeInvite } from '../services/inviteHandling';

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
                const numberOfUsers = await User.countDocuments({});
                const inviteCheck = await removeInvite(invitecode);
                if (!inviteCheck && numberOfUsers > 0) {
                    res.status(400).json({ 'Error': 'Invite incorrect!' });
                } else {
                    return await signUp(req, res);
                }
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

const getInvites = async(req: Request, res: Response) => {
    const invites = await listInvites();
    res.send({"Invitecodes": invites });
}

const newInviteEndpoint = async(req: Request, res: Response) => {
    const inviteCheck = await createNewInvite();
    if (inviteCheck) {
        const allInvites = await listInvites();
        res.send({ "Invitecodes": allInvites });
    } else {
        console.log("An issue creating a new invite!");
        res.status(500).json({ 'Error': 'Error creating a new invite!'}); 
    }
}

export { userRegistration, userLogin, userLogout, isAdminTest, getInvites, newInviteEndpoint }