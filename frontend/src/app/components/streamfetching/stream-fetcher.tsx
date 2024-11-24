"use server";

import axios from "axios";

export async function StreamFetcher() {
    // Figure out the best way of fetching user's streams
    // The following has to be fetched from the client (i.e. in a file where "use client")

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_ADDRESS; // Includes the last "/"
    const streamURL = baseURL + 'streams';

    try {
        console.log("ennen fetchausta");
        const response = await axios.get(streamURL);
        console.log("fetchauksen jälkeen");

        const data = await response.data;

        console.log("streams..:");
        console.log(data);
        
        return data;

    } catch (e: any) {
        console.log("Error!");
        console.log("====");
        console.log(e.response.status);
        if (e.response.status == 401) {
            return { redirect: { destination: '/login', permanent: false }};
        }
        console.log("====");
        return null;
    }
}