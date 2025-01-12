import axios from "axios";

const backendUrl: string = import.meta.env.VITE_BACKENDURL; //Includes  '/' as its last char
const loginUrl: string = backendUrl + 'login'; 
const registrationUrl: string = backendUrl + 'register';

const registration = async(data: any) => {
    const response = await axios.post(registrationUrl, data, { withCredentials: true });
    return response.data;
}

const login = async(data: any) => {
    const response = await axios.post(loginUrl, data, { withCredentials: true });
    return response.data;
}

export default { registration, login }