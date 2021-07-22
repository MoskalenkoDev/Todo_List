import {Router} from 'express';
import {userLogin, userSignUp} from './service';
const router = Router();

router.route('/login').post(userLogin);

router.route('/signup').post(userSignUp);

export {router};