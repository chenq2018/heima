// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入controller模块
const controller = require('./controller.js')

// 路由分发
// 测试
router.get('/', controller.test)

// 注册页面
router.get('/user/register', controller.getRegister)

// 登录页面，因为页面中a标签跳转是get方式，所以这里用get不用post，res.render()中路径前要加.否则报错
router.get('/user/login', controller.getLogin)

// 注册功能
router.post('/user/addRegister', controller.addRegister)

// 登录功能
router.post('/user/addLogin', controller.addLogin)

// 注销功能
router.get('/user/loginOut', controller.loginOut)

// 请求发表文章添加页
router.get('/article/add', controller.addArticle)

// 发表文章
router.post('/article/publish', controller.publishArticle)

// 文章详情
router.get('/article/info/:id', controller.detailArticle)

// 请求编辑
router.get('/article/edit/:id', controller.getEditArticle)

// 编辑完成
router.post('/article/editSuccess', controller.editSuccess)

// 路由循环分发方式
// 建立router文件把所有要分发的页面单独建立js，并放入到router文件中
// fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
//     if(err) return console.log('读取文件失败')
//     // 循环每一个文件
//     filename.forEach( fname => {
//         // 使用require导入路由模块
//         const router = require(path.join(__dirname, './router', fname))
//         app.use(router)
//     } )
// })

// for of 循环遍历数组，for in循环遍历对象
// const tt = ['zs', 'li']
// for (const v of tt) {
//     console.log(v)
// }

// 暴露router
module.exports = router