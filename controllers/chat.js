
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const user = require('../models/user');
const {verifyuserID} = require('../auth/user')

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);

const chat = require("../models/chat")(sequelize,Sequelize.DataTypes);
const message = require("../models/message")(sequelize,Sequelize.DataTypes);  
const user = require('../models/user')(sequelize,Sequelize.DataTypes);
module.exports = {
    showChats: async function(req, res, next){
        var user_id = verifyuserID(req);
        var chats = chat.findAll({
            where:{
                user1_id:user_id
            }
        })

    },
    createChat:async function(req,res,next){
        var user1_id = verifyuserID(req)
        var user2_id = req.body.id;
        await chat.findOrCreate({
            where:{
            user1_id:user1_id,
            user2_id:user2_id
        }});
        
    },
    showUsers: async function(req, res, next){

    },
    deleteChat: async function(req, res, next){

    },
    showMessages: async function(req, res, next){

    },
    sendMessage: async function(req, res, next){

    },
    deleteMessage: async function(req, res, next){

    }

}}