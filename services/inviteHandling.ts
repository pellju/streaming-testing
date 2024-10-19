import { randomBytes } from "crypto";
import { db } from "../models";

const generateNewInvite = (): string => {
    return randomBytes(25).toString('hex');
};


// Adding new invite:
// Post-request which generates the invite, saves it to database, and outputs it. Note! Admin-class is required!
const createNewInvite = async(): Promise<boolean> => {
    const inviteCode = generateNewInvite();
    
    try {
        console.log("Adding a new invite");

        const newInviteCode = new db.Invite({
            invitecode: inviteCode
        });

        await newInviteCode.save();

        return true;
    } catch (e: any) {
        console.log("Error creating a new invite!");
        console.log(e.message);
        return false;
    }
}

// Can be used for using invite because if returns true, then 

const removeInvite = async(invite: string): Promise<boolean> => {
    try {
        const inviteCheck: number = await db.Invite.countDocuments({ invitecode: invite });
        if (inviteCheck > 0) {
            await db.Invite.deleteOne({ invitecode: invite })
            return true;
        } else {
            return false;
        }

    } catch (e: any) {
        console.log("Error removing an invite!");
        console.log(e.message);
        return false;
    }
}

// Listing existing invites.
// Note! Admin-class is required!

const listInvites = async(): Promise<String[]> => {
    try {
        const inviteList = await db.Invite.find();
        const stringifiedInvites = inviteList.map((invite: any) => invite.invitecode.toString());
        return stringifiedInvites;
    } catch (e: any) {
        console.log("Error removing an invite!");
        console.log(e.message);
        return [];
    }
}

export { createNewInvite, removeInvite, listInvites }