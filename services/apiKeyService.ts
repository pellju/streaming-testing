//TEMPORARILY STORING API-KEYS
// ToDo: Create a way of saving the key to the database!
let keys: string[] = [];

// An extremely simple check if API-key exists
const checkKey = (key: string): boolean => {
    return keys.indexOf(key) > -1;
};

// Adding API-key to this temporary solution
const addingApiKey = (key: string): boolean => {
    try {
        keys.push(key);
        return true;
    } catch (e: any) {
        console.log('Error adding new API-key!');
        console.log(e.message);
        return false;
    }
};

// Removing API-key
const removeApiKey = (key: string): boolean => {
    try {
        const removableKeyIndex: number = keys.findIndex(string => string === key);
        keys.splice(removableKeyIndex, 1);
        return true;
    } catch (e: any) {
        console.log('Error removing API-key!');
        console.log(e.message);
        return false;
    }
    
};
export { keys, checkKey, addingApiKey, removeApiKey }