import { Schema, model, Types } from "mongoose";
import { RoleInterface } from "./role.model";

// Todo: Create an exportable Stream class

interface StreamInterface {
    _id: Types.ObjectId;
    name: string;
    url: string;
    requiredLevel: (Types.ObjectId | RoleInterface);
    category: string;
}

const streamSchema = new Schema<StreamInterface>({
    name: { type: String, required: true },
    url: { type: String, required: true },
    requiredLevel: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    category: { type: String, required: true }
}) 

const Stream = model("Stream", streamSchema);

export { Stream, StreamInterface }