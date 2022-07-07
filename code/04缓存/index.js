const express = require('express')

let app = express()

app.get('/getinfo',(req,res)=>{
    console.log('getinfo被访问了~~~');
    let date = new Date(Date.now() + 10*60*60*10000).toLocaleDateString();
    res.set({
        'Access-Control-Allow-Origin':'*',
        // 'Expires':new Date(Date.now() + 10000).toUTCString()
        // "Pragma":'no-cache',
        // 'Cache-Control':'no-cache',
        // 'Cache-Control':'max-age=10',
        // 'Cache-Control':'max-age=10,private',
    })
    res.send({
        code:200,
        data:[
            {name:'zjl',age:'13'}
        ]
    })
})



app.listen(8888,()=>{
    console.log('服务已启动');
})