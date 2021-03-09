'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const chat = require("./chat")(sequelize,Sequelize.DataTypes)
const {
  Model
} = require('sequelize');
const message = require("./message");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(User,{through:chat,
      foreignKey:"user1_id",
      as:"user1"
    });
      User.belongsToMany(User,{through:chat,
      foreignKey:"user2_id",
      as:"user2"
    });
      User.hasMany(message,{foreignKey:"sender_id"});
    }
  };
  User.init({
    username: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};