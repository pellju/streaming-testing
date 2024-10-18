import { db } from "../models";

const findAllStreams = async() => {
    const streams = await db.Stream.find();
    return streams;
}

const findStreamsUserCanSee = async(roles: string[]) => {

    try {

        const validRoles: string[] = db.ROLES;

        for (let i=0; i<roles.length; i++) {
            if (!validRoles.includes(roles[i])) {
                throw new Error ("Incorrect role given!");
            }
        }

        const validStreams = await db.Stream.find({
            requiredLevel: { $in: roles }
        });

        return validStreams;

    } catch (e: any) {
        console.log("Error with listing streams from database!");
        console.log(e.message);
        return null;
    } 
}

// Returning streaming list
const createStreamDatabaseObject = async(name: string, url: string, category: string, permissionRole: string) => {

    try {
       const validRoles: string[] = db.ROLES;

        if (!validRoles.includes(permissionRole)) {
            throw new Error ("Incorrect permission given!");
        }

        const newStreamObject = new db.Stream({
            name: name,
            url: url,
            category: category,
        });

        const correctRole = await db.Role.find({
            name: permissionRole
        });

        console.log(correctRole);

        newStreamObject.requiredLevel = correctRole[0];
        await newStreamObject.save();

        console.log("newStreamObject saved");

        return await findAllStreams();

    } catch (e: any) {
        console.log("Error with inputting Stream to database!");
        console.log(e.message);
        return null;
    }
}

const removeStreamDatabaseObject = async(name: string) => {
    try {

        await db.Stream.deleteOne({ name: name });
        return await findAllStreams();

    } catch (e: any) {
        console.log("Error with removing Stream from database!");
        console.log(e.message);
        return null;
    }
}

export { createStreamDatabaseObject, removeStreamDatabaseObject, findStreamsUserCanSee, findAllStreams }