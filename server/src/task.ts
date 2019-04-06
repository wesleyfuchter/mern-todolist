import {Schema, Document, model} from "mongoose";

interface Task extends Document {

    user_id?: string;
    title?: string;
    done?: boolean;

}

const TaskSchema: Schema = new Schema({
    user_id: String,
    title: String,
    done: Boolean,
});

export default model<Task>("Task", TaskSchema);
