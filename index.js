const bodyparse=require("body-parser");
const express=require("express");
const app=express();
app.use(bodyparse.json());
const cors=require('cors');
app.use(cors());
const db=require("./Model");


app.listen(8000,()=>{console.log("Application started in the port 8000")});