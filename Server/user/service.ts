import {Request , Response} from 'express';
import {User} from './schemas/userSchema';
import crypto from 'crypto';

const getEncryptedPassword = (password : string) : string => crypto.pbkdf2Sync(password, process.env.SALT || "unknownSalt", 1000, 64, 'sha512').toString('hex');

export const userLogin = async (req: Request, res: Response) : Promise<void> => {

    try {

        const {email, password} : {email : string, password : string} = req.body;

        await User.find({"email" : email ,"password" : getEncryptedPassword(password)}).exec((err, foundUser) => {
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
                
                const newUser = new User({
                    email,
                    password : getEncryptedPassword(password)
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