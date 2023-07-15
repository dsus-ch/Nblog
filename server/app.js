const express = require('express')
const path = require('path')
const multer = require('multer')
const app = express()
const upload = multer({ dest: "./public/upload/temp"})
const {expressjwt: jwtParse} = require('express-jwt')
/**
 * 需要导入模块 pnpm xxx
 * mysql2       数据库驱动
 * multer       上传文件
 * jsonwebtoken 生成JWT
 * express-jwt  解析JWT
 * 
 */

//跨域请求
app.use(function(req,res, next){
    // 开发环境设置，生产环境谨慎使用
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers","*");
    res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (res.method == 'OPTIONS') {
        res.sendStatus(200)
    } else next()
});

//中间件设置
app.use(express.json())
app.use(upload.any())

//解析JWT
const SECRET_KEY = 'CIT_lab_xkt_gw'
app.use(
    jwtParse({
        secret: SECRET_KEY,
        algorithms: ["HS256"], // 使用何种加密算法解析
    }).unless({path: ['/admin/login','/'] }) //检验时排除的页面
)

//挂载静态资源
app.use('/static',express.static(path.join(__dirname,'public')))

app.use('/admin/',require("./routers/Adminrouter"))
app.use('/category',require("./routers/Categoryrouter"))
app.use('/blog',require("./routers/Blogrouter"))

app.get('/', (req, res) => {
    res.send('Hello world')
})

const server = app.listen(8080, () => {
    console.log(`启动成功： http://localhost:${server.address().port}/`)
})

//错误处理中间件  TODO 单独写成一个文件，处理各种情况
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})