const express = require('express')
const router =express.Router()
const {useSQL, _query} = require("../db/DBUtils")
const hat = require('hat')


router.post('/login',async (req,res)=>{
    let {account,password} =req.body
    console.log(req.body)
    // 动态查询
    // sql select * from `admin` where `account` = ? and  `password` = ?"
    const [rows, fields] = await _query(useSQL.queryAccount,[account,password])

    //其他写法
    // const promisePool = pool.promise();
    // let [rows, fields] = await promisePool.execute("SELECT * FROM `admin` WHERE `account` = ? AND  `password` = ?",[account,password])

    console.log(rows)
    if(rows&&Object.keys(rows).length>0){//有这样的用户才能更新信息

        let login_token = hat()
        //sql UPDATE `admin` SET `token` = ? WHERE `id` = ?
        await _query(useSQL.updateToken,[login_token,rows["id"]])
        let admin_iofo = rows
        admin_iofo.token=login_token
        admin_iofo.password=""
        res.send({
            code:200,
            msg:"登陆成功！",
            data:admin_iofo
        })
    }else{
        res.send({
            code:500,
            msg:"登陆失败!"
        })
    }
})
module.exports = router