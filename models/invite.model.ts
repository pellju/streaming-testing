import { Schema, model } from "mongoose";

interface InviteInterface {
    invitecode: String;
}

const inviteSchema = new Schema<InviteInterface>({
    invitecode: { type: String, required: true }
});

const Invite = model("Invite", inviteSchema);

export { Invite }