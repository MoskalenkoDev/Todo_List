import {Request , Response} from 'express';
import {user} from './schemas/userSchema';
import md5 from 'md5';

export const userLogin = async (req: Request, res: Response) : Promise<void> => {

    try {

        const {Email, Password} : {Email : string, Password : string} = req.body;

        await user.find({"Email" : Email ,"Password" : Password}).exec((err, foundUser) => {
            return foundUser.length !== 0 ? res.sendStatus(200) : res.status(404).send("User is not registered");
        });

    }
    catch(e) {
        console.error(e);
    }
        
}

export const userSignUp = async (req: Request, res: Response) : Promise<void> => {
    
    try {

        const {Email, Password} : {Email : string , Password : string} = req.body;

        await user.find({"Email" : Email}).exec(async(err, foundUser) => {

            if(foundUser.length !== 0) return res.status(403).send("Account is already exist");
            else {
                const newUser = new user({
                    Email,
                    Password : md5(Password)
                });

                await newUser.save();
                return res.status(200).send("User added successfully");;
            }
        });
        
    }
    catch(e) {
        console.error(e);
    }

}