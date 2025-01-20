import React, { useState } from "react"
import streamservice from "../services/streamservice";

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char

export type Stream = {
    name: string,
    realname: string,
    category: string,
};

interface StreaminfoProps {
    name: string,
    realname: string,
    category: string,
    userApiKey: string,
}

const Streaminfo: React.FC<StreaminfoProps> = ({ name, realname, category, userApiKey }) => {

    // Use states and set some information for users if streams are being restarted etc...
    const handleStreamRestart = async (event: any) => {
        event.preventDefault();
        
        try {
            const response = await streamservice.restartStream(name);
            console.log(response);
        } catch (e: any) {
            console.log("Error restarting the stream: ");
            console.log(name);
        }
    }

    return (
        <div>
            <li key={name}>
                {realname} <i>(<a href={backendUrl+'secretstream/'+userApiKey+'/'+name+'.m3u8'}>.m3u8-Streaming link</a>)</i> [Category: {category}] <form onSubmit={handleStreamRestart}><button type='submit'>Restart stream</button></form>
            </li>
        </div>
    )

}

export default Streaminfo;