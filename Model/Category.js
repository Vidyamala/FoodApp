module.exports=(sequelize,Sequelize)=>{
    const category=sequelize.define("Category",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        categoryName:{
            type:Sequelize.STRING
        }
    })
    return category;
}