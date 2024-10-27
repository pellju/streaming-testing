"use server";

import axios from "axios";

export async function StreamFetcher() {
    // Figure out the best way of fetching user's streams
    const userToken = sessionStorage.getItem('auth_token');

    const baseURL = process.env.BACKEND_ADDRESS; // Includes the last "/"
    const streamURL = baseURL + 'streams';

    try {
        const response = await axios.get(streamURL, { headers: { 'Authorization': userToken }});
        console.log(response.data);
        return response.data;
    } catch (e: any) {
        console.log("Error!");
        console.log(e.err);
        return null;
    }
}