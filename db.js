// 引入mysql模块
const mysql = require('mysql')
// 配置mysql
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'heima',
    // 开启执行多条sql语句的功能
    multipleStatements: true
})

// 暴露成员
module.exports = conn