const express = require('express')
const router = express.Router()
const messageControllers = require('../controllers/message')
const { validateMessage, handleInvalidity } = require('../validators/message')

router.post('/sendmessage', validateMessage, handleInvalidity, messageControllers.sendMessage)

module.exports = router