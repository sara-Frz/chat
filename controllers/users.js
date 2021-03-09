const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const user = require("../models/user")(sequelize,Sequelize.DataTypes);

module.exports = {
showAllUsers:function(req,res,next) {
    const users = user.findAll();
    res.send(users);
},

createUser:function (req,res,next) {
    const  username = req.body.username;
    const phone_number = req.body.phone_number;
    const exist = user.findOne({where: {username: username}});
    console.log(exist);
    if (exist == null) {
        user.create({'username':username,'phone_number':phone_number});
        console.log(username);
    }else{
        res.send('username already exists!')
    }
},

deleteUser:function (req, res, next){
    console.log("creating user!")
    const username = req.body.username;
    const phone_number = req.body.phone_number;
    const exist = user.findOne({where: {
        username:username,
        phone_number:phone_number
    }});
    if (exist != null){
        user.destroy({where: {username:username}})
    }else{
        res.send("Username does not exists!")
    }
}

}
