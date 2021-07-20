import {connect} from 'mongoose';
import {config} from 'dotenv';
config();

export async function connectDB() : Promise<void> {
    
    const connection_link : string = process.env.MONGODB_CONNECTION_LINK || "fake link";
    try{
        console.log(connection_link);
        await connect(connection_link , {
            useNewUrlParser : true,
            useFindAndModify : false,
            useUnifiedTopology: true
        });
        console.log("Сonnection was successful");
    }

    catch (e){
        console.log(e);
    }
}
