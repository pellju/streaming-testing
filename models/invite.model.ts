import { Schema, model } from "mongoose";

interface InviteInterface {
    invitecode: string;
}

const inviteSchema = new Schema<InviteInterface>({
    invitecode: { type: String, required: true }
});

const Invite = model("Invite", inviteSchema);

export { Invite }