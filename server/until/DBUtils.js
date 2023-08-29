// driver for mysql
const mysql = require('mysql2')

// 创建一个数据库连接池
const pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	database: 'web_data_set',
	user: 'root',
	password: '123456',
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
})


/**
 * @param {String} sql
 * @param {Sting} values
 * @returns {Promise} Promise对象
 */
let _query = function (sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, conn) {
			if (err) {
				reject(err)
			} else {
				conn.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					// 结束会话
					pool.releaseConnection(conn)
				})
			}
		})
	})
}

module.exports = _query