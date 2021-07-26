import {Request , Response} from 'express';
import {Task} from './schemas/taskSchema';
import { ITask } from './interfaces/task';
import { Schema } from 'mongoose';


export const getTasks = async (req: Request, res: Response) : Promise<void> => {

    try {
        const {user} : {user : Schema.Types.ObjectId} = req.body;
        const tasks : Array<ITask> = await Task.find({user});
        res.send({tasks});
    }
    catch(e) {
        res.sendStatus(500);
        console.error(e);
    }       
}

export const addTask = async (req: Request, res: Response) : Promise<void> => {

    try {
        const {text, user} : {text : string, user : Schema.Types.ObjectId} = req.body;
        const taskModel = new Task({text, isEdited : false, user});
        await taskModel.save();
        res.sendStatus(200);
    }
    catch(e) {
        res.sendStatus(500);
        console.error(e);
    }
}

export const editTask = async (req: Request, res: Response) : Promise<void> => {

    try {
        const {newText, taskId} : {newText : string, taskId : Schema.Types.ObjectId} = req.body;
        const updateObj = {
            text : newText, 
            isEdited : true
        }
        await Task.updateOne({"_id" : taskId} , {$set : updateObj});
        res.sendStatus(200);
    }
    catch(e) {
        res.sendStatus(500);
        console.error(e);
    }
}

export const deleteTask = async (req: Request, res: Response) : Promise<void> => {

    try {
        const {taskId} : {taskId : Schema.Types.ObjectId} = req.body;
        await Task.deleteOne({"_id" : taskId});
        res.sendStatus(200);
    }
    catch(e) {
        res.sendStatus(500);
        console.error(e);
    }
}
