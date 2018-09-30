// 引入mysql
const conn = require('./db.js')
// 引入时间的模块moment
const moment = require('moment')
// 引入marked把markdown文本转换成html文本
const marked = require('marked')

// 逻辑处理
// 测试
const test = (req, res) => {
    // console.log(req.session.user)
    // 定义一页多少条数据
    const pageSize = 3
    // 现在所在第几页
    const nowPage = Number(req.query.page) || 1
   // sql语句
    const sql = 'select a.id, a.title, a.ctime, h.nickname from article a left join heima h on a.authorId = h.id order by a.id desc limit ' + (nowPage - 1) * pageSize + ',' + pageSize +';select count(*) as count from article'
    // 执行
    conn.query(sql, (err, result) => {
        if(err || !req.session.islogin) {
            return res.render('index.ejs', {
                user: req.session.user,
                islogin: req.session.islogin,
                articleAll: []
            })
        }
        
        // console.log(result)
        // 总共条数
        const totalCount = result[1][0].count
        // 总页数
        const totalPage = Math.ceil(totalCount / pageSize)  


        // if(!req.session.islogin) return res.redirect('/')
        // 渲染模板，获取session值并传递
        res.render('index.ejs', {
            user: req.session.user,
            islogin: req.session.islogin,
            articleAll: result[0],
            nowPage: nowPage,
            totalPage: totalPage
        })
    })

}

// 请求注册
const getRegister = (req, res) => {
    res.render('./user/register.ejs', {})
}

// 请求登录
const getLogin = (req, res) => {
    res.render('./user/login.ejs', {})
}

// 注册功能
const addRegister = (req, res) => {
    // 获取内容
    const registerInfo = req.body

    // 验证表单
    if(registerInfo.username.trim() == '' || registerInfo.password.trim() == '' || registerInfo.nickname.trim() == '') {
        return res.send({status: 501, msg: '表单信息不能为空，请重新填写'})
    }

    // 验证是否数据库中已经存在
    const sql1 = 'select count(*) as count from heima where username = ?'
    // 执行
    conn.query(sql1, registerInfo.username, (err, result) => {
        if(err) return res.send({status: 502, msg: '用户查询失败'})

        if(result[0].count !== 0) return res.send({status: 503, msg: '用户名已存在，请重新填写'})

        // // 密码加密处理
        // bcrypt.hash(req.body.password, saltRounds, (err, pwdCryped) => {
        //     if(err) return res.send({status: 504, msg: '注册用户失败' })
           
        //     req.body.password = pwdCryped 

        //     const sql = 'insert into heima set ?'

        //     // 获取日期方式二，需要安装moment模块
        //     registerInfo.ctime = moment().format('YYYY-MM-DD hh:mm:ss')
        
        //     // 执行语句
        //     conn.query(sql, registerInfo, (err, result) => {
        //         if(err) return res.send({status: 500, msg: err.message, data: {}})
        
        //        return res.send({status: 200, msg: 'ok', data: {}})
        //     })
        // })


        // 用户名数据库不存在可注册时
        // sql语句
        const sql = 'insert into heima set ?'
    
        // // 获取当前时间
        // const dt = new Date()
        // // 获取年
        // const y = dt.getFullYear()
        // // 获取月
        // const m = (dt.getMonth() + 1).toString().padStart(2, '0')
        // // 获取日
        // const d = dt.getDate().toString().padStart(2, '0')
        // // 获取时
        // const hh = dt.getHours().toString().padStart(2, '0')
        // // 获取分
        // const mm = dt.getMinutes().toString().padStart(2, '0')
        // // 获取秒
        // const ss = dt.getSeconds().toString().padStart(2, '0')
    
        // // 拼接
        // registerInfo.ctime = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

        // 获取日期方式二，需要安装moment模块
        registerInfo.ctime = moment().format('YYYY-MM-DD hh:mm:ss')
    
        // 执行语句
        conn.query(sql, registerInfo, (err, result) => {
            if(err) return res.send({status: 500, msg: err.message, data: {}})
    
           return res.send({status: 200, msg: 'ok', data: {}})
        })
    })

}

// 登录功能
const addLogin = (req, res) => {
    // 获取信息
    const loginInfo = req.body
    // 验证
    if(loginInfo.username.trim() == '' || loginInfo.password.trim() == '') {
        return res.send({status: 501, msg: '登录信息不能为空，请填写'})
    }

    // 查询结果，看时候唯一
    // sql语句
    const sql1 = 'select * from heima where username = ? and password = ?'
    // 执行
    conn.query(sql1, [loginInfo.username, loginInfo.password], (err, result) => {
        if(err) return res.send({status: 502, msg: '用户登录失败'})
        // 当查询结果不唯一时，登录失败
        if(result.length !== 1) return res.send({status: 503,  msg: '用户登录失败'})

        // // 比较注册的加密密码
        // bcrypt.compare(loginInfo.password, result[0].password, (err, pawRes) => {
        //      if(err) return res.send({status: 504,  msg: '用户登录失败'})

        //      if(!pawRes) return res.send({status: 505,  msg: '用户登录失败'})

        //      // 将登录的用户保存到session中
        //      req.session.user = result[0]
        //      // 设置是否登录为true
        //      req.session.islogin = true
             
        //      // 当唯一时
        //      res.send({status: 200, msg: 'ok', data: {}})
        // })

        // 登录功能获取session数据
        // console.log(result)
        // 将登录的用户保存到session中
        req.session.user = result[0]
        // 设置是否登录为true
        req.session.islogin = true
      
        // 当唯一时
        res.send({status: 200, msg: 'ok', data: {}})
    })
}

// 注销功能
const loginOut = (req, res) => {
    req.session.destroy(function(err){
        if(err) throw err
        console.log('用户退出成功')
        // 实现服务器的跳转
        res.redirect('/')
    })
}

// 发表文章添加页
const addArticle = (req, res) => {
    // 判断是否登录
    if(!req.session.islogin) return res.redirect('/')
    // 渲染
    res.render('./article/add.ejs', {
        user: req.session.user,
        islogin: req.session.islogin
    })
}

// 发表文章
const publishArticle = (req, res) => {
    // 获取数据
    const articleInfo = req.body
    // 获取当前时间
    articleInfo.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
    // 获取作者id，登录后发表文章页面时立即获取，相当于
    // articleInfo.authorID = req.session.user.id
    // sql语句
    const sql = "insert into article set ?"
    // 执行
    conn.query(sql, articleInfo, (err, result) => {
        if(err) return res.send({status: 501, msg: '发表文章失败'})

        // console.log(result)
        if(result.affectedRows !== 1) return res.send({status: 502, msg: '发表文章失败'})

        // 成功时，传递insertId
        res.send({status: 200, msg: 'ok', insertId: result.insertId})
    })
}

// 文章详情
const detailArticle = (req, res) => {
    // 判断是否登录
    if(!req.session.islogin) return res.redirect('/')
    // 获取发表文章时传递的id值
    const id = req.params.id
    // sql语句
    const sql = "select * from article where id = ?"
    // 执行
    conn.query(sql, id, (err, result) => {
        if(err) return res.sned({status: 501, msg: '请求文章详情数据失败'})
        // 当没结果时返回首页
        if(result.length !== 1) return res.redirect('/')

        // 在调用res.render()之前，先把markdown文本转换为html文本
        const html = marked(result[0].content)
        // console.log(html)
        result[0].content = html

        // console.log(result)
        // 成功时渲染页面
        res.render('./article/detail.ejs', {
            user: req.session.user,
            islogin: req.session.islogin,
            article: result[0]
        })
    })
}

// 获取编辑页面
const getEditArticle = (req, res) => {
    if(!req.session.islogin) return res.redirect('/')
    // 获取传递的id
    const id = req.params.id
    // sql语句
    const sql = "select * from article where id = ?"
    // 执行
    conn.query(sql, id, (err, result) => {
        if(err) return res.send({status: 501, msg: '请求编辑页面数据失败'})

        if(result.length !== 1) return res.redirect('/')

        // 成功时
        res.render('./article/edit.ejs', {
            user: req.session.user,
            islogin: req.session.islogin,
            editData: result[0]
        })
    })
}

// 编辑完成功能
const editSuccess = (req, res) => {
    // 获取id
    const id = req.body.id
    // sql语句
    const sql = "update article set ? where id = ?"
    // 执行
    conn.query(sql, [req.body, id], (err, result) => {
        if(err) return res.send({status: 501, msg: '编辑失败'})

        console.log(result)
        if(result.affectedRows !== 1) return res.send({status: 502, msg: '编辑失败'})

        // 成功时
        res.send({status: 200, msg: 'ok', data: result})
    })

}

// 暴露成员
module.exports = {
    test,
    getRegister,
    getLogin,
    addRegister,
    addLogin,
    loginOut,
    addArticle,
    publishArticle,
    detailArticle,
    getEditArticle,
    editSuccess
}