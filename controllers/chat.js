

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Sequelize = require('sequelize');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);

const chat = require("../models/chat")(sequelize,Sequelize.DataTypes);
const message = require("../models/message")(sequelize,Sequelize.DataTypes);  

module.exports = {
    startChat: function(req,res,next){
        var user1_id = req.params.id;
        var user2_id = req.body.id;
        var exist = chat.findOne({
            where:{
            user1_id:user1_id,
            user2_id:user2_id
        }});
        if(exist == null){
        chat.create({user1_id:user1_id, user2_id:user2_id});
        var chat_id = chat.findOne({
            attributes:['id'],
            where:{
                user1_id:user1_id,
                user2_id:user2_id
            }
        })
        res.send(message.findAll({
            where:{
            chat_id:chat_id
        }}));
    }else{
        res.send(exist)
    }},

    sendMessage: function(req,res,next){
        var msg = req.body.message;
        var sender_id = req.params.sender_id;
        var chat_id = req.params.chat_id;
        message.create({message:msg, sender_id:sender_id, chat_id:chat_id}); 

    }

}}