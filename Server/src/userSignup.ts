import {Router, Request, Response} from 'express';
import {User} from './Schemas/user_Schema';
const router = Router();

router.route('/signup').post(async function(req : Request , res : Response) {

    try {

        const {Email, Password} : {Email : string , Password : string} = req.body;

        await User.find({"Email" : Email}).exec(async(err, user) => {

            if(user.length !== 0) return res.status(403).send("Account is already exist");
            else {
                const new_user = new User({
                    Email,
                    Password
                });

                await new_user.save();
                return res.status(200).send("User added successfully");;
            }
        });
        
    }
    catch(e) {
        console.log(e);
    }

});

export {router as userSignup};
