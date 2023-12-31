// 配置路由对象

const express = require('express')
const {expressjwt: jwtParse} = require('express-jwt')
const router = express.Router() // 注册路由 

const userRouter = require('./user')
const blogRouter = require('./blog')

//注入路由模块
router.use('/api', userRouter)
router.use('/api', blogRouter)

//解析JWT
const SECRET_KEY = 'dsus,blog'
router.use(
  jwtParse({
      secret: SECRET_KEY,
      algorithms: ["HS256"], // 使用何种加密算法解析
  }).unless({path: ['/api/login','/'] }) //检验时排除的页面
)

// 自定义统一异常处理中间件
router.use((err, req, res, next) => {
  // 自定义用户认证失败的错误返回
  console.log('err===', err)
  if (err && err.name === 'UnauthorizedError') {
    const { status = 401, message } = err
    // 抛出401异常
    res.status(status).json({
      code: status,
      msg: 'token失效，请重新登录',
      data: null
    })
  } else {
    const { output } = err || {}
    // 错误码和错误信息
    const errCode = (output && output.statusCode) || 500
    const errMsg = (output && output.payload && output.payload.error) || err.message
    res.status(errCode).json({
      code: errCode,
      msg: errMsg
    })
  }
})

module.exports = router