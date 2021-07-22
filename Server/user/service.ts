import {Request , Response} from 'express';
import {User} from './schemas/userSchema';
import crypto from 'crypto';

export const userLogin = async (req: Request, res: Response) : Promise<void> => {

    try {

        const {email, password} : {email : string, password : string} = req.body;

        await User.find({"email" : email ,"password" : password}).exec((err, foundUser) => {
            return foundUser.length !== 0 ? res.sendStatus(200) : res.status(404).send("User is not registered");
        });

    }
    catch(e) {
        console.error(e);
    }
        
}

export const userSignUp = async (req: Request, res: Response) : Promise<void> => {
    
    try {

        const {email, password} : {email : string , password : string} = req.body;

        await User.find({"email" : email}).exec(async(err, foundUser) => {

            if(foundUser.length !== 0) return res.status(403).send("Account is already exist");
            else {
                
                const encodedPassword = crypto.pbkdf2Sync(password, process.env.SALT || "unknownSalt", 1000, 64, 'sha512').toString('hex');
                const newUser = new User({
                    email,
                    password : encodedPassword
                });
                
                await newUser.save();
                return res.status(200).send("User added successfully");
            }
        });
        
    }
    catch(e) {
        console.error(e);
    }

}