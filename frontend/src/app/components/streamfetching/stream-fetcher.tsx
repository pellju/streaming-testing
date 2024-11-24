import axios from "axios";
import https from 'https';

export async function StreamFetcher() {
    // Figure out the best way of fetching user's streams
    // The following has to be fetched from the client (i.e. in a file where "use client")

    const baseURL = process.env.NEXT_PUBLIC_BACKEND_ADDRESS; // Includes the last "/"
    const streamURL = baseURL + 'streams';

    try {
        console.log(process.env.ENV);

        let response = null;

        if (process.env.ENV == 'DEV') {
            console.log("Ignoring self-signed TLS-certificates");
            console.log(streamURL);
            const httpsAgent = new https.Agent({ rejectUnauthorized: false });
            response = await axios.get(streamURL, { withCredentials: true, httpsAgent });
        } else {
            response = await axios.get(streamURL, { withCredentials: true });
        }

        
        console.log("fetchauksen jälkeen");

        const data = await response.data;

        console.log("streams..:");
        console.log(data);
        
        return data;

    } catch (e: any) {
        console.log("Error!");
        console.log("====");
        if (e.response) {
            console.log("Status: ", e.response.status);
            console.log("Data:", e.response.data);
            console.log("Headers:", e.response.headers);
        } else if (e.request) {
            console.log("No response. Request: ", e.request);
        } else {
            console.log(e.message);
        }
        console.log("====");
        return null;
    }
}