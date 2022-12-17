const express = require('express')
const UserController = require('../controllers/user')
const router = express.Router();

router.get('/getusers',UserController.findAll)
router.post('/signup',UserController.create)
router.post('/login',UserController.login)

module.exports = router