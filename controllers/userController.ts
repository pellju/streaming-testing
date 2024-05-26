import {Request, Response } from 'express';

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
        return res.status(400).json({ 'Error': 'Missing invite!'});
    } else {
        try {

        } catch (e: any) {
            console.log("Registration error!");
            console.log(e.message);
            res.status(400).json({ 'Error': 'Unknown error!'});
        }
    }
}

const userLogin = (req: Request, res: Response) => {

}

export { userRegistration, userLogin }