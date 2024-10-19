import { db } from './index';


const roleCreation = async (): Promise<void> => {
    try {
        await db.mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`);
        console.log("Successfully connected to the database!");
        await createRoles();
    } catch (e: any) {
        console.log("Error:");
        console.log(e.message);
        process.exit(1);
    }
}


// Creating pre-defined roles:
// Improve and set types properly
const createRoles = async (): Promise<void> => {
    try {
        const roleCount: number = await db.Role.estimatedDocumentCount();
        if (roleCount === 0) {
            const roles = db.ROLES;

            for (const role of roles) {
                try {
                    const newRole = new db.Role({ name: role });
                    await newRole.save();
                    console.log('Added new role!');
                } catch (error: any) {
                    console.log("Error adding role");
                    console.log(error.message);
                }
            }
        }
    } catch (e: any) {
        console.log('Error counting roles');
        console.log(e.message);
    }
}

export { roleCreation }