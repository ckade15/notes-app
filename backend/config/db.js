const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        // Default mongodb server runs on localhost:27017
        const conn = await mongoose.connect(process.env.DEV_URL);
        console.log(`MongoDB connected to: ${conn.connection.host} \nDatabase port: ${conn.connection.port}`.yellow);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;