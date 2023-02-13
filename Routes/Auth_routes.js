const authcontroller=require("../Controller/User_controller");
module.exports=(app)=>{
    app.post("/foodapp/api/v1/auth/signup",authcontroller.signUp);
    app.put("/foodapp/api/v1/auth/verifyUser",authcontroller.verifyUser);
    app.post("/foodapp/api/v1/auth/login",authcontroller.Login)
}