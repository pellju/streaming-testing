import { Schema, model } from "mongoose";
import { Role } from "./role.model";

interface UserInterface {
    username: string,
    password: string,
    apikey: string,
    roles: Schema.Types.ObjectId[]
}

const userSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    apikey: { type: String, required: true },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }], 
});

const User = model("User", userSchema);

export { User }