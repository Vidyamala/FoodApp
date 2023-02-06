module.exports=(sequelize,Sequelize)=>{
    const food=sequelize.define("Food",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        foodName:{
            type:Sequelize.STRING
        },
        cost:{
            type:Sequelize.FLOAT
        },
        isveg:{
            type:Sequelize.BOOLEAN
        },
        description:{
            type:Sequelize.STRING
        }
    })
    return food;
}