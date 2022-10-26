const mongoose = require("mongoose");
require("dotenv/config");

const db = "mongodb+srv://NodejsC:urlshortening@cluster0.ae213uv.mongodb.net/?retryWrites=true&w=majority";

const conncectDb = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true
        });
        console.log("Mongodb connected...");

    }catch(err){
        console.error("Cannot");
        console.error(err.message);
        process.exit(-1);
    }
};
module.exports = conncectDb;