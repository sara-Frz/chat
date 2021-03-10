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
showAllUsers:async function(req,res,next) {
    const users = await user.findAll();
    res.send(users);
},

createUser:async function (req,res,next) {
    const  username = req.body.username;
    const phone_number = req.body.phone_number;
    const exist = await user.findOne({where: {username: username}});
    console.log(exist);
    if (exist == null) {
        user.create({'username':username,'phone_number':phone_number});
        res.send("username added!");
    }else{
        res.send('username already exists!')
    }
},

deleteUser:async function (req, res, next){
    console.log("creating user!")
    const username = req.body.username;
    const phone_number = req.body.phone_number;
    const exist = await user.findOne({where: {
        username:username,
        phone_number:phone_number
    }});
    if (exist != null){
        await user.destroy({where: {username:username}})
        res.send("username deleted!")
    }else{
        res.send("Username does not exists!")
    }
}

}
