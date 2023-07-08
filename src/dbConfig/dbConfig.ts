import mongoose from "mongoose";
// this connect will always will be connected on any change
export async function connect() {
    const mongourl=process.env.MONGO_URL;
    try {
        mongoose.connect(mongourl!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDb Connected Successfully')
        })
connection.on('error',(err)=>{
    console.log('MongoDb Connection Error'+err);
    process.exit();
})
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}