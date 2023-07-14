//查询
const express = require('express')
const router = express.Router()
const {useSQL, _query, genid} = require("../db/DBUtils")


router.get("/test",(req, res)=>{

    _query(useSQL.queryAll,[]).then(rows=>{
        for(let i=0;i<rows.length;i++){
            console.log("%d %s %s %s",rows[i].id,rows[i].account,rows[i].password,rows[i].token)
        }
    }).catch(err=>{
        console.log(err)
    })

    res.send({
        id: genid.NextId()
    })
})

module.exports = router

