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
    const phone_number_regex = /\d{11}/
    if (!phone_number_regex.test(phone_number)){
        res.status(400).send("not a phone_nummber")
        return null
    }
    const username_exist = await user.findOne({where: {username: username}});
    const phone_number_exist = await user.findOne({where: {phone_number: phone_number}});

    if ((username_exist != null)) {
        res.status(409).send("username exists!")
        return null
    }else if(phone_number_exist != null){
        res.status(409).send('A username with this phone number exists!')
        return null
    }else{
        user.create({'username':username,'phone_number':phone_number});
        res.status(201).send("username added!");
        return null
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
        return null
    }else{
        res.status(409).send("Username does not exists!")
        return null
    }
}

}
