import React from "react"

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

    return (
        <div>
            <li key={name}>{realname} <i>(<a href={backendUrl+'secretstream/'+userApiKey+'/'+name+'.m3u8'}>.m3u8-Streaming link</a>)</i> [Category: {category}]</li>
        </div>
    )

}

export default Streaminfo;