const mongoose = require("mongoose");


module.exports = ()=>{
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.DB);
        console.log('Database Connected Successfully.....');
    } catch (error) {
        console.log("Erorr:",error.message);
        console.log('Database not Connected Successfully.....');

    }
}