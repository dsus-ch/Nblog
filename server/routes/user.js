//用户路由模块

const express = require('express')
const router = express.Router()
const userApi = require('../api/users')


router.post('/login', async (req, res) => await userApi.login(req, res))
// router.post('/register', async (req, res) => await userApi.register(req, res))


module.exports = router