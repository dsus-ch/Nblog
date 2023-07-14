/**
 * 导入模块
 * mysql    数据库驱动
 * hat      生成随机ID
 * multer   上传文件
 */
const { _query } = require('./db/DBUtils')
const express = require('express')
const multer  = require('multer')
const path = require('path')
const router = require('./routers/Testrouter')
const upload = multer({ dest: "./public/upload/temp"})
const app = express()


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
//视图引擎设定
// app.set()

//中间件设置
app.use(express.json())
app.use(upload.any())

//放在所有路由顶部，进行权限（登陆）验证
const DEFEND_PATH = '/token'
app.all("*",async (req,res,next)=>{
    if(req.path.indexOf(DEFEND_PATH)!=-1){
        const {token} = req.headers
        console.log(token)
        //在数据库查找
        const [rows, fields] = await _query("SELECT * FROM admin WHERE token = ?",[token])
        if(rows&&Object.keys(rows).length>0) { next() }
        else{
            res.send({
                code:403,
                msg:"请先登陆！",
            })
        }
    }else { next() }

})

//挂载静态资源
app.use('/static',express.static(path.join(__dirname,'public')))

app.use('/test/',require("./routers/Testrouter"))
app.use('/admin/',require("./routers/Adminrouter"))
app.use('/category',require("./routers/Categoryrouter"))
app.use('/blog',require("./routers/Blogrouter"))

app.get('/', (req, res) => {
    res.send('Hello world')
})

const server = app.listen(8080, () => {
    console.log(`启动成功： http://localhost:${server.address().port}/`)
})

//错误处理中间件
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})