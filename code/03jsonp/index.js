const express = require('express')

let app = express()


// normal
app.get('/getinfo',(req,res)=>{
    res.set({
        'Access-Control-Allow-Origin':'*'
    })
    res.send({
        code:200,
        data:[
            {name:'zjl',age:'13'}
        ]
    })
})

app.get('/testJsonp',(req,res)=>{
    // 拿到传递的回调函数
    console.log(req.query.callbackFun);
    let callbackFun = req.query.callbackFun
    let resData = JSON.stringify({
        code:200,
        data:[
            {name:'zjl',age:100},
            {name:'vae',age:100},
            {name:'xusong',age:100},
            {name:'jay',age:100},
        ]
    })
    res.send(`${callbackFun}(${resData})`)
})

// 非简单请求
app.delete('/complex',(req,res)=>{
    // res.set({
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, t',
    //     'Access-Control-Request-Method': 'PUT,POST,GET,DELETE,OPTIONS',
    //     'Access-Control-Allow-Credentials': true
    // })
    res.header('Access-Control-Allow-Origin','*',)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , zjl');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.send({
        code:200,
        data:[
            {name:'zjl',age:100},
            {name:'vae',age:100},
            {name:'xusong',age:100},
            {name:'jay',age:100},
        ]
    })
})

app.listen(8888,()=>{
    console.log('服务已启动');
})