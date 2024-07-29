import mongoose from "mongoose";

const Stream = mongoose.model("Stream", new mongoose.Schema({
    name: String,
    url: String,
    requiredLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    category: String
}));

export { Stream }