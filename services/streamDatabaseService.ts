import { db } from "../models";

// Returning streaming list
const createStreamDatabaseObject = async(name: string, url: string, category: string, permissionRole: string) => {

    try {

       const validRoles = db.ROLES;

        if (!validRoles.includes(permissionRole)) {
            throw new Error ("Incorrect permission given!");
        }

        const newStreamObject = new db.Stream({
            name: name,
            url: url,
            category: category
        });

        const correctRole = await db.Role.find({
            name: permissionRole
        });

        console.log(correctRole);

        newStreamObject.requiredLevel = correctRole[0]._id;
        await newStreamObject.save();

        console.log("newStreamObject saved");

    } catch (e: any) {
        console.log("Error with inputting Stream to database!");
        console.log(e.message);
        return null;
    }
}


export { createStreamDatabaseObject }