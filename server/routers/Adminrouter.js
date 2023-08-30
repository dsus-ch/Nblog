const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const _query = require("../until/DBUtils")


const admin_sql = {
	query_all: "SELECT * FROM admin",
	query: "SELECT * FROM `admin` WHERE `account` = ? AND  `password` = ?",
	insert: "INSERT INTO admin (account,password) VALUES (?,?)",
	updata: "UPdata admin SET account = ? WHERE id = ?",
	delete: "DELETE FROM admin WHERE id = ?"
}

const SECRET_KEY = 'CIT_lab_xkt_gw' //生成token的密钥


/**
 * 登陆
 * @param {String} 邮箱
 * @param {String} 密码 
 */
router.post('/login', async (req, res) => {
	let { account, password } = req.body.data
	// 动态查询
	// sql select * from `admin` where `account` = ? and  `password` = ?"
	const [rows, fields] = await _query(admin_sql.query, [account, password])
	console.table(rows, fields)


	if (rows && Object.keys(rows).length > 0) {
		//校验成功生成JWT

		/***
		 * 第一个参数 生成到token中的信息
		 * 第二个参数 密钥
		 * 第三个参数 token的有效时间 60，"2h"，"3d"..
		 */
		const token = jwt.sign(
			{ user: { id: rows.id, account: rows.account } },
			SECRET_KEY,
			{ expiresIn: '3d' }
		)

		res.send({
			code: 200,
			msg: "登陆成功！",
			token
		})
	} else {
		res.send({
			code: 500,
			msg: "登陆失败!"
		})
	}
})

module.exports = router