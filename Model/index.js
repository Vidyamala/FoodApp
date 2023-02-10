const config=require("../Config/db_config");
const Sequelize=require("sequelize");
const sequelize=new Sequelize(config.DB,config.USER,config.PASSWORD,{
    dialect:config.dialect,
    host:config.host,
    operatorAliases:false,
    pool:{
        min:config.POOL.min,
        max:config.POOL.max,
        acquire:config.POOL.acquire,
        idle:config.POOL.idle
    }
});
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.cart=require("./Cart")(sequelize,Sequelize);
db.category=require("./Category")(sequelize,Sequelize);
db.food=require("./Food")(sequelize,Sequelize);
db.restaurant=require("./Restaurants")(sequelize,Sequelize);
db.role=require("./Role")(sequelize,Sequelize);
db.user=require("./User")(sequelize,Sequelize);

db.user.belongsToMany(db.role,{through:"userroles"});
db.role.belongsToMany(db.user,{through:"userroles"});

db.user.hasOne(db.cart);
db.cart.belongsTo(db.user);

db.category.belongsToMany(db.restaurant,{through:"categoryrestaurant"});
db.restaurant.belongsToMany(db.category,{through:"categoryrestaurant"});

db.food.belongsToMany(db.restaurant,{through:"restaurantfood"});
db.restaurant.belongsToMany(db.food,{through:"restaurantfood"});

db.category.hasMany(db.food);
db.food.belongsTo(db.category);

db.food.belongsToMany(db.cart,{through:"foodcart"});
db.cart.belongsToMany(db.food,{through:"foodcart"});

sequelize.sync({force:false})
.then(()=>{
    console.log("DB synced");
}).catch((err)=>{
    console.log(err.message)
})