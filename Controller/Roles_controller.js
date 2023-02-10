const {role}=require("../Model");
exports.addroles=async (req,res)=>{
    const {rolename}=req.body;
    console.log(role)
    try{
        const rolecreated=await role.create({name:rolename});
        console.log(rolecreated);
        res.send({message:`Role named ${rolename} created successfully`})
    }
    catch(err){
        console.log(err);
        if(err.message=="Validation error"){
            res.status(400).send({message:`Roles must be unique! ${rolename} already exists`})
        }
        else{
            res.status(500).send({message:"Something went wrong!"})
        }
    }
   
}
exports.deleteByName=async (req,res)=>{
    const {rolename}=req.body;
    try{
       const deletedrole=await role.destroy({where:{name:rolename}});
       console.log(deletedrole)
       if(deletedrole==1){
        res.send({message:`${rolename} deleted successfully`})
       }
       else if(deletedrole==0)[
        res.status(400).send({message:`${rolename} doesn't exist`})
       ]
       
    }
    catch(err){
        res.status(500).send({message:`Something went wrong! ${err.message}`})
    }
}