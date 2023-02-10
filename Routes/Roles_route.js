const rolescontroller=require("../Controller/Roles_controller");
module.exports=(app)=>{
    app.post("/foodapp/api/v1/roles",rolescontroller.addroles);
    app.delete("/foodapp/api/v1/roles",rolescontroller.deleteByName);
}