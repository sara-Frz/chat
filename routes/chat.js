var express = require('express');
const chat = require('../controllers/chat');
var router = express.Router();

router.get('/',chat.showChats)
    .delete('/', chat.deleteChat)
    .get('/:chatID',chat.showMessages)
    .post('/:chatID',chat.sendMessage)
    .delete('/:chatID', chat.deleteMessage)
    .get('/newchat', chat.showUsers)
    .post('/newchat', chat.createChat)
