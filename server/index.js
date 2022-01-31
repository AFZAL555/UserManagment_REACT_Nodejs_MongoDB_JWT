require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminauthRoutes = require("./routes/adminauth");
const adminadduserRoutes = require("./routes/AdminAddusers");
const fetchuserdataRoutes = require("./routes/fetchuserdata");
const deleteRoutes = require("./routes/Deleteuser");
const updateRoutes = require("./routes/Update");
const searchRouters = require("./routes/searchRouters");



//Database Connection//
connection();

//middlewars.......//
app.use(express.json());
app.use(cors());


//routes//
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/adminauth",adminauthRoutes);
app.use("/api/AdminAddusers",adminadduserRoutes);
app.use("/api/fetchuserdata",fetchuserdataRoutes);
app.use("/api/delete",deleteRoutes);
app.use("/api/update",updateRoutes);
app.use("/api/search",searchRouters);





const PORT_NUMBER = process.envPORT||8080;
app.listen(PORT_NUMBER, ()=>{
    
    console.log(`Server is running Successfully on port : ${PORT_NUMBER}...`);

});