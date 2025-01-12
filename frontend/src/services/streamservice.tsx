import axios from "axios";

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char
const streamlistUrl: string = backendUrl + 'streams';

const fetchStreams = async() => {
    const response = await axios.get(streamlistUrl, { withCredentials: true });
    return response.data;
}

export default { fetchStreams }