import React, { useState } from "react";
import streamservice from "../services/streamservice";

interface AddingNewStreamProps {
    setUserStreams: any
}

const AddingNewStream: React.FC<AddingNewStreamProps> = ({ setUserStreams }) => {
    
    // useStates added here due to being an admin-only model, so no need for loading it in the main application
    const [name, setName] = useState<string>('');
    const [realname, setRealname] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [disableTlsCheck, setDisableTlsCheck] = useState<boolean>(false);
    const [category, setCategory] = useState<string>(''); // ToDo: change to a list of items
    const [permission, setPermission] = useState<string>(''); // ToDo: change to a list of items

    const changeTlsCheck = () => {
        //const currentValue: boolean = disableTlsCheck;
        console.log("Existing value: ", disableTlsCheck);
        setDisableTlsCheck(!disableTlsCheck);
        console.log("New value: ", disableTlsCheck);
    }

    const addNewStream = async(event: any) => {
        event.preventDefault();

        try {
            const response = await streamservice.addStream(name, realname, input, disableTlsCheck, category, permission);
            console.log("Response: ");
            console.log(response);
            const streamResponse = await streamservice.fetchStreams();
            setUserStreams(streamResponse);

        } catch (e: any) {
            console.log("Failed to add a new stream: ");
            console.log(e.error);
        }
    }

    return (
        <div id="addingNewStream">
            <form onSubmit={addNewStream}>
                <div>
                    Name of the stream (cannot contain spaces): <input type='text' value={name} name='streamName' onChange={({target}) => setName(target.value)} />
                </div>
                <div>
                    Real name of the stream (can contain spaces): <input type='text' value={realname} name='realName' onChange={({target}) => setRealname(target.value)}/>
                </div>
                <div>
                    Input URL: <input type='text' value={input} name='input' onChange={({target}) => setInput(target.value)}/>
                </div>
                <div>
                    Should checking for invalid TLS-sertificate be disabled: <input type='checkbox' name='input' onChange={() => changeTlsCheck()}/>
                </div>
                <div>
                    What is the category (needs to be exact at the moment): <input type='text' value={category} name='category' onChange={({target}) => setCategory(target.value)} />
                </div>
                <div>
                    Permission (needs to be exact at the moment): <input type='text' value={permission} name='permissionSetting' onChange={({target}) => setPermission(target.value)} />
                </div>
                <button id='newStream-button' type='submit'>Add a new stream</button>
            </form>
        </div>
    )
}

export default AddingNewStream;