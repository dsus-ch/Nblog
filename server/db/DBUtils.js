const {pool} = require("./DBconnect")
const GenId = require('../until/idgenerator')

//封装sql语句
let useSQL ={
    insert:"INSERT INTO admin (account,password) VALUES (?,?)",
    updateToken:"UPDATE `admin` SET `token` = ? WHERE `id` = ?",
    queryAll:"SELECT * FROM admin",
    queryAccount:"SELECT * FROM `admin` WHERE `account` = ? AND  `password` = ?"
}

/**
 *
 *
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

  //雪花id
const genid = new GenId({ WorkerId: 1 })


module.exports={
    useSQL,
    genid,
    _query
}