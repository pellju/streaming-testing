import mongoose from "mongoose";
import { User } from "./user.model";
import { Role } from "./role.model";
import { roleCreation } from "./createRoles";

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    User: User,
    Role: Role,
    ROLES: ["limited", "user", "fulluser", "admin"],
    roleCreation: roleCreation
}

export { db }