import express , {Application} from 'express';
import {connect} from 'mongoose';
import {config} from 'dotenv';
import cors from 'cors';
import {userRouter} from './user/controller';
import {toDoRouter} from './todoList/controller';

config();
const app : Application = express();

app.use('/', (req, res, next) => {
    next();
});

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

const PORT : string = process.env.PORT || "3001";

const start = async() : Promise<void> => {
    
    const connectionLink : string = process.env.MONGODB_CONNECTION_LINK || "fake link";
    try {

        await connect(connectionLink , {
            useNewUrlParser : true,
            useFindAndModify : false,
            useUnifiedTopology: true
        });

        app.listen(PORT, ()=> {
            console.log("Server has been started at port", PORT);
        });
    }

    catch (e) {
        console.error(e);
    }
}

app.use(userRouter);
app.use(toDoRouter);

start();
