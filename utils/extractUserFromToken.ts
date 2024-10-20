import jwt from 'jsonwebtoken';

require('dotenv').config();

const JWT_SECRET = process.env.COOKIETOKENSECRET;

if (!JWT_SECRET) {
    throw new Error('Missing JWT secret!');
};

// A customized "user" class containing ID which is either a valid ID or a null
type userObjectContainingId = {
    id: string | null;
};

// Returning either null or the user ID.
const extractUserFromToken = (fullToken: string): string | null  => {
    
    let user: userObjectContainingId = { id: null }
    const extractedToken: string = fullToken.split("Bearer ")[1];

    try {
        jwt.verify(extractedToken, JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                throw new Error("Unathorized");
            } else {
                console.log("Decoded:");
                console.log(decoded);
                user = decoded as { id: string };
            }
        });
        return user.id;
    } catch (e: any) {
        return user.id;
    }        
}

export { extractUserFromToken }