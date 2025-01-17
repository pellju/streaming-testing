import { Stream } from "stream";
import { db } from "../models";
import { StreamInterface } from "../models/stream.model";

// Stream object must be created as class
const findAllStreams = async(): Promise<StreamInterface[]> => {
    const streams: StreamInterface[] = await db.Stream.find().lean();
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
const createStreamDatabaseObject = async(name: string, realName: string, url: string, category: string, permissionRole: string, disableTlsCheck: number): Promise<StreamInterface[] | null>  => {

    try {
       const validRoles: string[] = db.ROLES;

        if (!validRoles.includes(permissionRole)) {
            throw new Error ("Incorrect permission given!");
        }

        const newStreamObject = new db.Stream({
            name: name,
            realName: realName,
            url: url,
            category: category,
            lastStart: 0,
            disableTlsCheck: 0
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

const fetchStreamObjectFromDatabase = async(streamname: string) => {
    try {
        const wantedStream: Stream | null = await db.Stream.findOne({ name: streamname });
        if (wantedStream) {
            return wantedStream;
        } else {
            console.log("Failed to find the following stream:");
            console.log(streamname);
            return null; // Enhance the information
        }
    } catch (e: any) {
        console.log("Error finding the following stream:");
        console.log(streamname)
        return null;
    }
}

const updateStreamLastStart = async(streamname: string) => {
    try {
        const time = Date.now();
        const replacedStream: Stream | null = await db.Stream.findOneAndUpdate({ name: streamname, lastStart: time });
        if (replacedStream) {
            return true;
        } else {
            console.log("Error replacing lastStart!");
            return false;
        }
    } catch (e: any) {
        console.log("Error replacing lastStart:");
        console.log(e.message);
        return false;
    }
}

export { createStreamDatabaseObject, removeStreamDatabaseObject, findStreamsUserCanSee, findAllStreams, fetchStreamObjectFromDatabase, updateStreamLastStart }