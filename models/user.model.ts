import mongoose from "mongoose";

const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    password: String,
    apikey: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
}));

export { User }