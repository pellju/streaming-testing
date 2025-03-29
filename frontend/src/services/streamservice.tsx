import axios from "axios";

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char
const streamlistUrl: string = backendUrl + 'streams';

const fetchStreams = async() => {
    const response = await axios.get(streamlistUrl, { withCredentials: true });
    return response.data;
}

const restartStream = async(streamName: string) => {
    const restartUrl: string = backendUrl + 'restart/' + streamName; 

    try {
        const response = await axios.post(restartUrl, {}, { withCredentials: true });
        return response.data;
    } catch {
        console.log("There was an error with restartStream-function");
        return null;
    }
}

const deleteStream = async(streamName: string) => {
    const deleteStreamUrl: string = backendUrl + 'remove/' + streamName;

    try {
        const response = await axios.delete(deleteStreamUrl, { withCredentials: true });
        return response.data;
    } catch {
        console.log("There was an error with deleteStream-function");
        return null;
    }
}

export default { fetchStreams, restartStream, deleteStream }