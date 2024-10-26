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

        const response = await axios.post(loginUrl, data);
        console.log("responseData:");
        const responseData = response.data;
        console.log(responseData)

        return null;
    }
}