//博客路由模块

const express = require('express')
const router = express.Router()
const mianService = require('../core/articleService')
const otherService = require('../core/categoryService')


router.post('/search', async (req, res) => await mianService.searchAllArticle(req, res))
router.post('/add-article', async (req, res) => await mianService.addArticle(req, res))
router.put('/update-article', async (req, res) => await mianService.updateArticle(req, res))
router.delete('/delete-article', async (req, res) => await mianService.deleteArticle(req, res))


router.post('/search-category', async (req, res) => await otherService.searchAllCategory(req, res))
router.post('/add-category', async (req, res) => await otherService.addCategory(req, res))
router.put('/update-category', async (req, res) => await otherService.updateCategory(req, res))
router.delete('/delete-category', async (req, res) => await otherService.deleteCategory(req, res))


module.exports = router