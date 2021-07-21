import {Router, Request, Response} from 'express';
import {User} from './Schemas/user_Schema';
const router = Router();

router.route('/login').post(async function(req : Request, res : Response) : Promise<void> {

    try {

        const {Email, Password} : {Email : string, Password : string} = req.body;

        await User.find({"Email" : Email ,"Password" : Password}).exec((err, user) => {
            return user.length !== 0 ? res.sendStatus(200) : res.status(404).send("User is not registered");
        });

    }
    catch(e) {
        console.log(e);
    }
    
});

export {router as userLogin};