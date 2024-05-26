import mongoose from "mongoose";
import { User } from "./user.model";
import { Role } from "./role.model";

mongoose.Promise = global.Promise;

const db: any = {}; // Fix this!
db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.ROLES = ["limited", "user", "fulluser", "admin"];

export { db }