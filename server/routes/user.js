//用户路由模块

const express = require('express')
const router = express.Router()
const service = require('../core/userService')


router.post('/login', async (req, res) => await service.login(req, res))


module.exports = router