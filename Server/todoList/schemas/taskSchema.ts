import { Schema, model , Model} from 'mongoose';
import {ITask} from '../interfaces/task';

const taskSchema: Schema = new Schema({
  text: { type: String, required: true },
  isEdited: { type: String, required: true },
  user : { type: Schema.Types.ObjectId, ref: 'User', required : true}
});

export const Task = model<ITask>('Task', taskSchema);