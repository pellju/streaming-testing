import { randomBytes } from "crypto";

const generateNewInvite = (): string => {
    return randomBytes(25).toString('hex');
};


// Adding new invite:
// Post-request which generates the invite, saves it to database, and outputs it. Note! Admin-class is required!

// Using invite:
// Checks if it exists, and if yes, removes from existing lists and allows user to register

// Removing invite: 
// Give invite code which will be deleted. Note! Admin-class is required!

// Listing existing invites.
// Note! Admin-class is required!