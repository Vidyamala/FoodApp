module.exports=(sequelize,Sequelize)=>{
    const role=sequelize.define("Role",{
        roleid:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            unique:true
        }
    })
    return role;
}