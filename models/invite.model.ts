import mongoose from "mongoose";

const Invite = mongoose.model("Invite", new mongoose.Schema({
    invitecode: String
}));

export { Invite }