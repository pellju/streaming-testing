import React, { useState } from "react"
import { Stream } from "./Streaminfo";
import Streamplayer from "./Streamplayer";

import Streaminfo from "./Streaminfo";

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char

interface StreamProps {
    items: Stream[],
    userApiKey: string,
}

const Streamlist: React.FC<StreamProps> = ({ items = [], userApiKey }) => {
        
        const [streamUrl, setStreamUrl] = useState<string>('');

        let itemList: Stream[] = [];
        if (items.length > 0) {
            itemList = items;
        }

        return (
            <div>
                <h2>Videoplayer:</h2>
                <Streamplayer streamingUrl={streamUrl} />
                <br/>
                <h2>Streams:</h2>
                <div id="streamlist">
                    {itemList.map(item =>
                        <Streaminfo name={item.name} realname={item.realname} category={item.category} userApiKey={userApiKey} streamUrl={streamUrl} setStreamUrl={setStreamUrl} />
                    )}
                </div>
            </div>
        )
}

export default Streamlist;