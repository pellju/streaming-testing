import React from "react"

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char

type Stream = {
    name: string, // ToDo: Move the type elsewhere and add more information, such as category
    category: string,
};

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
                        <li key={item.name}>{item.name} <i>(<a href={backendUrl+'secretstream/'+userApiKey+'/'+item.name+'.m3u8'}>.m3u8-Streaming link</a>)</i> [Category: {item.category}]</li>
                    )}
                </div>
            </div>
        )
}

export default Streamlist;