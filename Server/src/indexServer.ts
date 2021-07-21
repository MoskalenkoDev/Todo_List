import express , {Application, Request, Response, NextFunction} from 'express';
import {connectDB} from './connectDb';
import cors from 'cors';
import {userLogin} from './userLogin';
import {userSignup} from './userSignup';

const app : Application = express();

app.use('/', (req : Request, res : Response, next : NextFunction) => {
    next();
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

const PORT : string = process.env.PORT || "3001";

async function start() : Promise<void> {
    try {
        await connectDB();
        app.listen(PORT, ()=> {
            console.log("Server has been started at port", PORT);
        });
    }

    catch (e) {
        console.log(e);
    }
}

app.use(userLogin);
app.use(userSignup);

start();



