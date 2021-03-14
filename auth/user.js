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
const jwt = require('jsonwebtoken')

module.exports = {
    verifyuserID: function(req){
        var token = req.header.authorization
        var phone_number = jwt.verify(token, secret_key).data.phone_number;
        var user_id = await user.findOne({
            where:{
                phone_number:phone_number
            },
            attributes:['id']
        })
        return user_id 
    }
}