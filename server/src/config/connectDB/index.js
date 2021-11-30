const mongoose = require('mongoose');
require('dotenv').config();
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.u7ufw.mongodb.net/blog_project?retryWrites=true&w=majority`;
const connectDB = async()=>{

    try {
        await mongoose.connect(URI,{
            // useCreateIndex:true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            // useFindAndModify:false,
        })
        console.log('MongooseDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
module.exports = {connectDB};