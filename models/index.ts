import mongoose from "mongoose";
import { User } from "./user.model";
import { Role } from "./role.model";

mongoose.Promise = global.Promise;

const db = {
    mongoose: mongoose,
    User: User,
    Role: Role,
    ROLES: ["limited", "user", "fulluser", "admin"]
}

export { db }