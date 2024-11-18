"use server";

import axios from "axios";

export async function loginAction (formData: FormData) {
    const username: string|undefined = formData.get('username')?.toString();
    const password: string|undefined = formData.get('password')?.toString();

    if (!username || !password) {
        return null;
    } else {

        const baseURL = process.env.BACKEND_ADDRESS; // Includes the last "/"
        const loginUrl = baseURL + 'login';

        const data = {
            "username": username,
            "password": password,
        };

        try {
            const response = await axios.post(loginUrl, data);
            const responseData = response.data;
            const token = `Bearer ${responseData.token}`;
            
            return token;
        } catch (e: any) {
            console.log("Error while logging in!");
            console.log(e.err);
            return null;
        }       
    }
}

// registerAction should be fix according to loginAction
export async function registerAction (formData: FormData) {
    const username: string|undefined = formData.get('username')?.toString();
    const password: string|undefined = formData.get('password')?.toString();
    const password_again: string|undefined = formData.get('password_again')?.toString();
    const invitecode: string|undefined = formData.get('invitecode')?.toString();

    if (!username || !password || !invitecode) {
        console.log("username or password or invitecode missing");
        return null;
    } else if (password !== password_again) {
        console.log("mismatching passwords");
        return null;
    } else {

        console.log("everything works");
        
        const baseURL = process.env.BACKEND_ADDRESS; // Includes the last "/"
        const registerUrl = baseURL + 'register';

        const data = {
            "username": username,
            "password": password,
            "invite": invitecode,
        };

        // Create a try-catch

        const response = await axios.post(registerUrl, data);
        console.log("responseData:");
        const responseData = response.data;
        console.log(responseData)

        return null;
    }
}