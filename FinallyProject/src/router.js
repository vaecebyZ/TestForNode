const express = require('express')

//调用路由
const router = express.Router();
//调用业务逻辑
const controller = require('./controller')

router
.get('/',controller.toMain)
.get('/add',controller.toAdd)
.get('/edit',controller.toEdit)

.get('/search',controller.getSearch)
.get('/del',controller.getDel)
.post('/edit',controller.getPost)

module.exports = router
