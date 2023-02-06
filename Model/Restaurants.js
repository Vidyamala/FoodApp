module.exports=(sequelize,Sequelize)=>{
    const restaurant=sequelize.define("Restaurant",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        restaurantName:{
            type:Sequelize.STRING,
            unique:true
        },
        address:{
            type:Sequelize.text
        },
        contact:{
            type:Sequelize.INTEGER,
            unique:true
        },
        ispureveg:{
            type:Sequelize.BOOLEAN
        }


    })
    return restaurant;
}