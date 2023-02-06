module.exports=(sequelize,Sequelize)=>{
    const role=sequelize.define("Role",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true
        },
        name:{
            type:Sequelize.STRING,
            unique:true
        }
    })
    return role;
}