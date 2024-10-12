import { Schema, model, Types } from "mongoose";

interface RoleInterface {
    _id: Types.ObjectId;
    name: string;
}

const roleSchema = new Schema<RoleInterface>({
    name: { type: String, required: true }
})

const Role = model("Role", roleSchema);

export { Role, RoleInterface }