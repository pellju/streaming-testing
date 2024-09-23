import { Schema, model } from "mongoose";

interface StreamInterface {
    name: string,
    url: string,
    requiredLevel: Schema.Types.ObjectId,
    category: string
}

const streamSchema = new Schema<StreamInterface>({
    name: { type: String, required: true },
    url: { type: String, required: true },
    requiredLevel: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    category: { type: String, required: true }
}) 

const Stream = model("Stream", streamSchema);

export { Stream }