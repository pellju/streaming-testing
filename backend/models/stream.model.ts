import { Schema, model, Types } from "mongoose";
import { RoleInterface } from "./role.model";

// Todo: Create an exportable Stream class

interface StreamInterface {
    _id: Types.ObjectId;
    name: string;
    realName: string;
    url: string;
    requiredLevel: (Types.ObjectId | RoleInterface);
    category: string;
    lastStart: Date;
    disableTlsCheck: number;
}

const streamSchema = new Schema<StreamInterface>({
    name: { type: String, required: true },
    realName: { type: String, required: true },
    url: { type: String, required: true },
    requiredLevel: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    category: { type: String, required: true },
    lastStart: { type: Date, default: 0}, // Check if restarted
    disableTlsCheck: { type: Number, default: 0} // TLS-certificates are checked by default
}) 

const Stream = model("Stream", streamSchema);

export { Stream, StreamInterface }