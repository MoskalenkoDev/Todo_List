import {Request , Response} from 'express';
import {User} from './schemas/userSchema';
import crypto from 'crypto';

const getEncryptedPassword = (password : string) : string => crypto.pbkdf2Sync(password, process.env.SALT || "unknownSalt", 1000, 64, 'sha512').toString('hex');

export const userLogin = async (req: Request, res: Response) : Promise<void> => {

    try {

        const {email, password} : {email : string, password : string} = req.body;
        
        const foundUser = await User.findOne({"email" : email ,"password" : getEncryptedPassword(password)});
        foundUser ? res.status(200).send(foundUser._id) : res.sendStatus(404);
    }
    catch(e) {
        res.status(500);
        console.error(e);
    }
        
}

export const userSignUp = async (req: Request, res: Response) : Promise<void> => {
    
    try {

        const {email, password} : {email : string , password : string} = req.body;

        const foundUser = await User.findOne({"email" : email});

        if(foundUser) res.status(403).send("Account is already exist");
        else {
            
            const newUser = new User({
                email,
                password : getEncryptedPassword(password)
            });
            
            await newUser.save();
            res.status(200).send(newUser._id);
        }
        
    }
    catch(e) {
        res.status(500);
        console.error(e);
    }

}