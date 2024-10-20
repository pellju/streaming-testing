import { Schema, model, Types } from "mongoose";
import { RoleInterface } from "./role.model";

interface UserInterface {
    _id: Types.ObjectId;
    username: string;
    password: string;
    apikey: string;
    roles: (Types.ObjectId | RoleInterface )[];
}

const userSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    apikey: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }], 
});

const User = model("User", userSchema);

export { User, UserInterface }