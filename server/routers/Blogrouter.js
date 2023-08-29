const express = require('express')
const router = express.Router()
const _query = require("../until/DBUtils")
const GenId = require("../until/idgenerator")
//雪花id
const genid = new GenId({ WorkerId: 1 })



const blog_sql = {
	query_all: "SELECT * FROM  blog",
	query: "SELECT COUNT(*) FROM blog",
	insert: "INSERT INTO blog (id,category_id,title,content,create_time) VALUES(?,?,?,?,?)",
	update: "UPDATE blog SET category_id = ?,title = ?,content = ? WHERE id = ?",
	delete: "DELETE FROM blog WHERE id = ?"
}
//需要注意 插入、更新、删除语句的返回值是不可迭代对象，我们可以用受影响的行来统计

/**
 * 查询博客
 * @date 2023-04-09
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
router.get('/search', async (req, res) => {

	/**
	 * keyword —— 模糊查询
	 * category_id —— 查询一类文章
	 * 
	 * 分页 
	 * 页码 page
	 * 分页大小 pageSize
	 */

	console.log(req.auth)//解析jwt的内容默认在req.auth属性

	let { keyword, category_id, page, pageSize } = req.query

	keyword ??= ""
	category_id ??= 0
	page ??= 1//为空则从第一页开始
	pageSize ??= 10

	//简单拼装sql语句
	let params = []
	let conditions = []
	if (category_id != 0) {
		conditions.push(" category_id = ? ")
		params.push(category_id)
	}
	if (keyword != "") {
		conditions.push(" title LIKE ? OR content LIKE ?")
		params.push(`%${ keyword }%`)
		params.push(`%${ keyword }%`)
	}
	let query_sql = blog_sql.query_all
	let searchCountSql = blog_sql.query
	if (conditions.length > 0) {//说明条件拼装上去了
		query_sql += " WHERE" + conditions.join("AND")
		searchCountSql += " WHERE" + conditions.join("AND")
	}

	let searchCountParams = params

	//分页，排序
	query_sql += " ORDER BY create_time DESC LIMIT ?,? "
	params.push((page - 1) * pageSize)
	params.push(pageSize)

	//查询博客
	const searchResult = await _query(query_sql, params)
	//查询数据总数
	const countResult = await _query(searchCountSql, searchCountParams)

	if (searchResult && countResult && searchResult.length > 0 && countResult.length > 0) {
		res.send({
			code: 200,
			msg: "查询成功！",
			data: {
				keyword,
				category_id,
				page,
				pageSize,
				rows: searchResult,
				count: countResult[0]['COUNT(*)'],
			}
		})
	} else {
		res.send({
			code: 500,
			msg: "查询失败！",
		})
	}

})



/**
 * 添加博客
 * @date 2023-04-09
 * @param {String} 接口路径
 * @param {Function} 函数 
 */

router.post('/add', async (req, res) => {
	const { category_id, title, content } = req.body
	let id = genid.NextId()
	let create_time = new Date().getTime()
	const result = await _query(blog_sql.insert, [id, category_id, title, content, create_time])

	if (result.affectedRows > 0) {
		res.send({
			code: 200,
			msg: "添加成功！",
		})
	} else {
		res.send({
			code: 500,
			msg: "添加失败！",
		})
	}

})


/**
 * 更新博客
 * @date 2023-04-09
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
router.put('/update', async (req, res) => {
	const { id, title, category_id, content } = req.body
	const result = await _query(blog_sql.update, [category_id, title, content, id])
	if (result.affectedRows > 0) {//没有变动代表更新不成功
		res.send({
			code: 200,
			msg: "更新成功！",
		})
	} else {
		res.send({
			code: 500,
			msg: "更新失败！",
		})
	}

})


/**
 * 删除博客
 * @date 2023-04-09
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
router.delete('/delete', async (req, res) => {
	const id = req.query.id
	const result = await _query(blog_sql.delete, [id])

	if (result.affectedRows > 0) {//删除失败则 affectedRows 为 0
		res.send({
			code: 200,
			msg: "删除成功！",
		})
	} else {
		res.send({
			code: 500,
			msg: "删除失败！",
		})
	}

})
module.exports = router