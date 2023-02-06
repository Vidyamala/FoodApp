module.exports=(sequelize,Sequelize)=>{
    const cart=sequelize.define("Cart",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        cost:{
            type:Sequelize.FLOAT
        }
    })
    return cart;
}