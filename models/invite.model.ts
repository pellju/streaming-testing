import { Schema, model, Types } from "mongoose";

interface InviteInterface {
    _id: Types.ObjectId;
    invitecode: string;
}

const inviteSchema = new Schema<InviteInterface>({
    invitecode: { type: String, required: true }
});

const Invite = model("Invite", inviteSchema);

export { Invite }