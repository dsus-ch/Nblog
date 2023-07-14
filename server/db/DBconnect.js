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
  });


//导出模块

module.exports = {
    pool
}