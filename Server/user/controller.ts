import {Router} from 'express';
import {userLogin, userSignUp} from './service';
const userRouter = Router();

userRouter.route('/login').post(userLogin);

userRouter.route('/signup').post(userSignUp);

export {userRouter};