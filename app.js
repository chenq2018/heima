// 引用express模块
const express = require('express')

// 创建服务器
const app = express()

// 模板引擎不需要引入, 直接配置, 模板引擎名字
app.set('view engine', 'ejs')
// 模板页面的存放路径
app.set('views', './views')

// 配置静态页面
app.use(express.static('./views'))  // 把views托管为根目录相当于 http://127.0.0.1:3001  启动index.ejs则相当于http://127.0.0.1:3001/index.ejs
app.use('/node_modules', express.static('./node_modules'))  // 把node_modules托管为根目录相当于 http://127.0.0.1:3001/node_modules
app.use('/bootstrap', express.static('./bootstrap'))

// 引入body-parser
const bodyParser = require('body-parser')
// 注册中间件
app.use(bodyParser.urlencoded({extended: false}))
// 复杂数据类型
app.use(bodyParser.json())

// 跨域
const cors = require('cors')
// 注册中间件
app.use(cors())

// 引用express-session模块
const session = require('express-session')
// 注册中间件，注册后req.session可以获取到储存数据
app.use(session({
    secret: '这是加密密钥',    // 相当于一个加密密钥，值可以是任意字符串
    resave: false,            // 强制session保存到session store中
    saveUninitialized: false  // 强制没有'初始化' 的session保存到storage中 
}))

// 导入加密模块
// const bcrypt = require('bcrypt')
// 定义幕次
// const saltRounds = 10

// 引入router，所有的中间件都要在router之前引用
const router = require('./router.js')
// 注册中间件
app.use(router)

// 启动服务器
app.listen(3001, () => {
    console.log('server running at http://127.0.0.1:3001')
})

