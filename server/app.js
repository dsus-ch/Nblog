const express = require('express')
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: "./public/upload/temp"})
const routes = require('./routes')

/**
 * 使用模块
 * mysql2       数据库驱动
 * multer       上传文件
 * jsonwebtoken 生成JWT
 * express-jwt  解析JWT
 * 
 */

const app = express()

//跨域请求
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
})

app.use(express.json())
app.use(upload.any())

//挂载静态资源
app.use('/static',express.static(path.join(__dirname,'public')))

//注入路由
app.use('/',routes)

const server = app.listen(8080, () => {
    console.log(`启动成功： http://localhost:${server.address().port}/`)
})
