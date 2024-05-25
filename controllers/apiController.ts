import { keys, addingApiKey, removeApiKey } from "../services/apiKeyService";

const addNewApiKey = (key: string): boolean => {
    try {
        if (keys.includes(key)) {
            throw new Error ('API-key already added!');
        } else {
            return addingApiKey(key);
        }
    } catch (e: any) {
        console.log('Error!');
        console.log(e.message);
        return false;
    }
};

const deleteApiKey = (key: string): boolean => {
    try {
        return removeApiKey(key);
    } catch (e: any) {
        console.log('Error!');
        console.log(e.message);
        return false;
    };
};

const listKeys = (): string[] => {
    return keys;
}

export { addNewApiKey, deleteApiKey, listKeys }