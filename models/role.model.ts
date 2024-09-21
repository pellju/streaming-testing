import { Schema, model } from "mongoose";

interface RoleInterface {
    name: String;
}

const roleSchema = new Schema<RoleInterface>({
    name: { type: String, required: true }
})

const Role = model("Role", roleSchema);

export { Role }