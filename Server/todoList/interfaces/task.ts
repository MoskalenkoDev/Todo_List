import { Schema , Document} from "mongoose";

export interface ITask extends Document{
    text: string,
    isEdited: boolean,
    user : Schema.Types.ObjectId
}