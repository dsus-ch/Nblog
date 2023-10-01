const express = require('express')
const router = express.Router()
const articleApi = require('../api/articles')
const categoryApi = require('../api/categories')


router.post('/search', async (req, res) => await articleApi.searchAllArticle(req, res))
router.post('/add-article', async (req, res) => await articleApi.addArticle(req, res))
router.put('/update-article', async (req, res) => await articleApi.updateArticle(req, res))
router.delete('/delete-article', async (req, res) => await articleApi.deleteArticle(req, res))


router.post('/search-category', async (req, res) => await categoryApi.searchAllCategory(req, res))
router.post('/add-category', async (req, res) => await categoryApi.addCategory(req, res))
router.put('/update-category', async (req, res) => await categoryApi.updateCategory(req, res))
router.delete('/delete-category', async (req, res) => await categoryApi.deleteCategory(req, res))


module.exports = router