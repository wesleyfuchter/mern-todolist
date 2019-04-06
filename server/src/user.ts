import {Schema, Document, model} from "mongoose";

interface User extends Document {
    email?: string;
    name?: string;
    isAdmin?: boolean;
}

const UserSchema: Schema = new Schema({
    email: String,
    name: String,
    isAdmin: Boolean,
});

export default model<User>("User", UserSchema);
