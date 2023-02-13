const bodyparse=require("body-parser");
const express=require("express");
const app=express();
app.use(bodyparse.json());
const cors=require('cors');
app.use(cors());
require("dotenv").config();
const db=require("./Model");
require("./Routes/Roles_route")(app)
require("./Routes/Auth_routes")(app)
app.listen(8000,()=>{console.log("Application started in the port 8000")});