import mongoose from "mongoose";

const Invite = mongoose.model("Role", new mongoose.Schema({
    invitecode: String
}));

export { Invite }