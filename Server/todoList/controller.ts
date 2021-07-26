import {Router} from 'express';
import {getTasks,addTask, editTask , deleteTask} from './service';
const toDoRouter = Router();

toDoRouter.route('/todoList/getTasks').post(getTasks);

toDoRouter.route('/todoList/addTask').post(addTask);

toDoRouter.route('/todoList/editTask').post(editTask);

toDoRouter.route('/todoList/deleteTask').post(deleteTask);

export {toDoRouter};