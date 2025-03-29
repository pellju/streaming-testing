import React, { useState } from "react"
import streamservice from "../services/streamservice";
import Streamplayer from "./Streamplayer";

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
    streamUrl: string,
    setStreamUrl: any,
    isAdmin: boolean,
    setUserStreams: any
}

const Streaminfo: React.FC<StreaminfoProps> = ({ name, realname, category, userApiKey, streamUrl, setStreamUrl, isAdmin, setUserStreams }) => {

    const liveStreamUrl: string = backendUrl+'secretstream/'+userApiKey+'/'+name+'.m3u8';

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

    const handleStreamUrl = (event: any) => {
        event.preventDefault();
        
        setStreamUrl(liveStreamUrl);
    }

    const handleStreamRemoval = async (event: any) => {
        event.preventDefault();

        try {
            const response = await streamservice.deleteStream(name);
            const streamResponse = await streamservice.fetchStreams();
            setUserStreams(streamResponse);
            console.log(response);
        } catch (e: any) {
            console.log("Error deleting the stream: ");
            console.log(name);
        } 
    }

    return (
        <div>
            <li key={name}>
                {realname} <i>(<a href={liveStreamUrl}>.m3u8-Streaming link</a>)</i> [Category: {category}] <form onSubmit={handleStreamUrl}><button type='submit'>Watch stream</button></form> <form onSubmit={handleStreamRestart}><button type='submit'>Restart stream</button></form> {isAdmin && <form onSubmit={handleStreamRemoval}><button type='submit'>Delete stream</button></form>}
            </li>
        </div>
    )

}

export default Streaminfo;