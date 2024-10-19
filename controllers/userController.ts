import {Request, Response } from 'express';
import { User } from '../models/user.model';
import { signUp, login, logout, editUser, renewingAPIkey } from '../services/userService';
import { createNewInvite, listInvites, removeInvite } from '../services/inviteHandling';

const userRegistration = async (req: Request, res: Response) => {
    const body = req.body;
    const username: string = body.username;
    const password: string = body.password;
    const invitecode: string = body.invitecode; // Create a simple check afterwards that if the userDatabase is empty, a separate invite code for the first user

    // Checking if required information is given
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
            // Checking if there's an existing user with the given username
            const findingUser = await User.findOne({ username: username });
            if (findingUser) {
                res.status(400).json({ 'Error': 'User with given username exists!' });
            } else {
                // Checking if the given invite is is valid (or if the number of existing users is larger than 0 meaning that first user can be done without invite)
                const numberOfUsers = await User.countDocuments({});
                const inviteCheck = await removeInvite(invitecode);
                if (!inviteCheck && numberOfUsers > 0) {
                    res.status(400).json({ 'Error': 'Invite incorrect!' });
                } else {
                    // In case everything works, forwarding the request to service handling the signup
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

    // Testing if the required fields are given
    if (body === undefined) {
        return res.status(400).json({ 'Error': 'Login registration data!'});
    } else if (username === undefined) {
        return res.status(400).json({ 'Error': 'Missing username!'});
    } else if (password === undefined) {
        return res.status(400).json({ 'Error': 'Missing password!'});
    } else {
        try {
            // Checking if there's a user with given username
            const findingUser = await User.findOne({ username: username });
            if (findingUser) {
                // In case there is, requesting the login function
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

// Setting the logout function
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

// Function to get the existing invite codes
const getInvites = async(req: Request, res: Response) => {
    const invites = await listInvites();
    res.send({"Invitecodes": invites });
}

// Creating a new invite
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

const changeApiKey = async(req: Request, res: Response) => {
    // Authentication needs to be checked (i.e. that the token belongs to the user)
    // If succeeded, use renewingAPIkey to generate and set the refreshed API-key to the user
}

// Only admin can do this by default
// ToDo: WIP
const userEdit = async(req: Request, res: Response) => {

    const body = req.body;
    const password = body.password;
    const userClass = body.class; // Think how to check these
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ 'Error': 'Missing ID in the parameter!' });
    }

    if (!body) {
        return res.status(400).json({ 'Error': 'Missing password or classes!'});
    } else {
        // Enter the function used for changing the information;
        let newUserClass = '';
        let newPassword = '';
        
        if (!password && !userClass) {
            return res.send({ 'Information': 'No information changeable'});
        }

        if (password) {
            newPassword = password;
        }

        if (userClass) {
            newUserClass = userClass;
        }

        try {
            // Add a function used for the service
            await editUser(req, res);

        } catch (e: any) {
            console.log('Error editing user!');
            console.log(e.message);
            return res.status(400).json({ 'Error': 'Error modifying user information!'});
        }
    }
}


// Only admin can do this by default
const userRemoval = async(req: Request, res: Response) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ 'Error': 'UserID missing!'});
    }

    try {
        const removeUser = await User.findByIdAndDelete(userId);
        return res.json({ 'Information': `Removed ${removeUser} from the database!` });
    } catch (e: any) {
        console.log(e.message);
        return res.status(400).json({ 'Error': 'Unable to remove the given userId!'});
    }
}

export { userRegistration, userLogin, userLogout, isAdminTest, getInvites, newInviteEndpoint, userRemoval, userEdit, changeApiKey }