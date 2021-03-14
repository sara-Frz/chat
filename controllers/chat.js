
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');
const user = require('../models/user');
const {verifyuserID} = require('../auth/user');
const message = require('../models/message');

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

        var users = user.findAll()
        res.send(users)
    },
    deleteChat: async function(req, res, next){
        var user_id = verifyuserID (req)
        await chat.destroy({
            where:{
                user1_id:user_id,
                id:req.body.id
            }
        })
    },
    showMessages: async function(req, res, next){
        var user_id = verifyuserID(req)
        var messages = message.findAll({
            where:{
                id:req.params.chatID
            }
        })
        

    },
    sendMessage: async function(req, res, next){
        var sender_id = verifyuserID(req)
        var msg = await message.create({
            message:req.body.message,
            sender_id:sender_id,
            chat_id:req.params.chatID
        })


    },
    deleteMessage: async function(req, res, next){
        var sender_id = verifyuserID (req)
        await message.destroy({
            where:{
                sender_id:sender_id,
                chat_id:req.params.chatID,
                id:req.body.id
            }
        })

    }

}}