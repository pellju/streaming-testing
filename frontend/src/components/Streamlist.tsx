import React from "react"
import { Stream } from "./Streaminfo";

import Streaminfo from "./Streaminfo";

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char

interface StreamProps {
    items: Stream[],
    userApiKey: string,
}

const Streamlist: React.FC<StreamProps> = ({ items = [], userApiKey }) => {
        console.log("items...");
        //console.log(items);

        let itemList: Stream[] = [];
        if (items.length > 0) {
            itemList = items;
        }

        return (
            <div>
                <h2>Streams:</h2>
                <div id="streamlist">
                    {itemList.map(item =>
                        <Streaminfo name={item.name} realname={item.realname} category={item.category} userApiKey={userApiKey} />
                    )}
                </div>
            </div>
        )
}

export default Streamlist;