const db=require("../Model")
const {user}=db;
const Role=db.role;
const op=db.Sequelize;
const jwt=require("jsonwebtoken")
// const {op}=require("sequelize")
const bycrypt=require("bcrypt");
const e = require("express");
exports.signUp=async (req,res)=>{
    const {role,username,email,mobile,password}=req.body;
    console.log(role,username,email,mobile,password)
    const pwd=await bycrypt.hash(password,10);
    console.log(pwd)
    try{
        const userCreated=await user.create({username,email,mobile,password:pwd});
        if(role){
            console.log(role);
            //  [Op.or]: [{name:role}]
            const rolee=await Role.findOne({where:{[op.Op.or]: [{name:role}]}});
            console.log(rolee);
            if(rolee){
                await userCreated.setRoles(rolee);
                console.log(process.env.SECRET)
                const token=jwt.sign({id:userCreated.id},process.env.SECRET);
                console.log(token);
                res.status(200).send(`User with username ${username} created successfully! Token: ${token}`)
            }
            else{
                const rolee=await Role.findOne({where:{[op.Op.or]: [{name:role}]}});
           
                 await userCreated.setRoles(rolee);
                 const token=jwt.sign({id:userCreated.id},process.env.SECRET);
                console.log(token);
                res.status(400).send(`Invalid role ${role}! Account created with default role! Token: ${token}`)
            }
        }
        
    }
    catch(err){
        res.status(500).send(`Something went wrong! Error message: ${err.message}`)
    }
}

exports.verifyUser=async (req,res)=>{
    const {token}=req.body;
    jwt.verify(token,process.env.SECRET,async function(error,decoded){
        try{
            if(error){
                return res.status(400).send({error:"Unauthorized"});
            }
            const userid=decoded.id;
            const userdata=await user.findByPk(userid);

        await user.update({isVerified:true},{where:{id:userid}});
        res.status(200).send({message:"User verified successfully"})
        }
        catch(err){
            res.status(500).send({error:err.message})
        }
    })
}
exports.Login=async (req,res)=>{
    try{
        const {username,password}=req.body;
    const userr=await user.findOne({where:{username:username}});
    if(userr==null){
        res.status(400).send("Invalid Username");
    }
    console.log("password"+userr.password);
    let valid=await bycrypt.compare(password,userr.password);
   
    if(valid){
        const token=jwt.sign({id:userr.id},process.env.SECRET,{expiresIn:"30d"});
        if(userr.isVerified){
            res.status(200).send(`User logged in successfully! Token: ${token}`);
        }
        else{
            res.status(200).send(`User is not verified! Verify User before logging in`)
        }
        
    }
    else{
        res.status(400).send("Invalid Credentials!");
    }
    }
    catch(err){
        res.status(500).send({error:`${err.message}` || `Something went wrong!`})
    }
    
}
// Login , middleware (username,email,mobile),jwt