const _query = require("../until/DBUtils")
const GenId = require("../until/idgenerator")
const genid = new GenId({ WorkerId: 1 })


const category_sql = {
	query_all: "SELECT * FROM category",
	query: "SELECT * FROM category WHERE name = ?",
	insert: "INSERT INTO category (id,name) VALUES(?,?)",
	updata: "UPdata category SET name = ? WHERE id = ?",
	delete: "DELETE FROM category WHERE id = ?"
}
//需要注意 插入、更新、删除语句的返回值是不可迭代对象，我们可以用受影响的行来统计


/**
 * 接口列表
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
async function searchAllCategory(req, res){
	const body = await _query(category_sql.query_all, [])
	const [rows, fields] = body
	if (rows && Object.keys(rows).length > 0) {
		res.send({
			code: 200,
			msg: "查询成功！",
			body//body:body
		})
	} else {
		res.send({
			code: 500,
			msg: "查询失败！",
		})
	}
}


/**
 * 添加接口
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
async function addCategory(req, res){
	const { name } = req.body
	//判断有没有重复的name
	const [rows, fields] = await _query(category_sql.query, [name])
	if (rows && Object.keys(rows).length > 0) {
		console.log("该分类存在!")
		res.send({
			code: 500,
			msg: "添加失败！",
		})
	} else {
		const result = await _query(category_sql.insert, [genid.NextId(), name])
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
	}
}


/**
 * 更新接口
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
async function updateCategory(req, res){
	const { name, id } = req.body
	const result = await _query(category_sql.updata, [name, id])
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
}


/**
 * 删除接口
 * @param {String} 接口路径
 * @param {Function} 函数 
 */
async function deleteCategory(req, res){
	const id = req.query.id
	const result = await _query(category_sql.delete, [id])

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
}


module.exports = {
	searchAllCategory,
	addCategory,
	updateCategory,
	deleteCategory,
}