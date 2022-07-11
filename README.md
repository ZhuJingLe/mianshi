# 面试复习题
## 1.css 选择器及其优先级
+ !important   (优先级最高)
+ 内联样式      (权值1000)
+ ID 选择器    （权值100）
+ 类选择器/[属性选择器](https://www.w3school.com.cn/css/css_attribute_selectors.asp)/伪类选择器   （权值10）
+ 元素选择器/伪元素选择器    （权值1）

## 2.什么是 BFC?
> BFC全称为块级格式化上下文（Block Formatting Context）。它是 W3C CSS2 规范中的一个概念，它是页面中的一块渲染区域（相当是一个独立的容器），并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。内部元素的布局不会影响到外部的元素。
### 如何触发 BFC？
+ body 根元素
+ 浮动元素：float 除 none 外的值
+ 绝对元素定位：position(absolute fixed)
+ display 为 flex inline-block table-cells
+ overflow 除了 visible 外的值（hidden scroll auto）
### BFC 应用
+ 同一个 BFC 里面的元素外边距会发生重叠(取最大值)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div{
            width: 100px;
            height: 100px;
            margin: 100px;
            border: 1px solid red;
        }
        div:first-child{
            margin: 50px;
        }
    </style>
</head>
<body>
    <div>hahah</div>
    <div>heheh</div>
</body>
</html>
```
+ 清除子元素浮动带来的影响
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            border: 1px solid red;
            overflow: hidden;
        }
        .inner{
            width: 300px;
            height: 200px;
            border: 1px dashed blue;
            float: right;
        }
    </style>
</head>
<body>
    <div class="outer">
        <div class="inner">
            hahah
        </div>
    </div>
</body>
</html>
```
+ 避免浮动元素的覆盖(两栏布局)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .outer{
            border: 1px solid red;
            height: 400px;
            width: 400px;
            float: left;
            background-color: cyan;
            clear: both;
        }
        .inner{
            width: 900px;
            height: 700px;
            background-color: bisque;
            /* display: inline-block; */
        }
    </style>
</head>
<body>
    <div class="outer">
        asfdgfhgjhkjjghfdgsfghj
    </div>
    <div class="inner">
        hahah243567890876543sdfghjkhghfdfsadfgh
    </div>
</body>
</html>
```

## 3.CSS 盒子模型
+ W3C 盒模型 （box-sizing:content-box）
> 元素的宽高表现为内容区域的宽高不包含内边距（padding）和边框（border）
+ IE 盒模型 （box-sizing:border-box）
> 元素的宽高表现为内容大小（content）+内边距（padding）+边框的大小（margin）

## 4.实现两栏布局（左边宽度固定有边宽度自适应）
+ float + margin
+ float + calc()
+ float + overflow
+ flex 布局

## 5.跨域
### 产生跨域的原因？
+ 浏览器处于安全性考虑指定了同源策略限制、
+ 协议、ip和端口不一致都是跨域行为
### 解决跨域的方法？
+ jsonp （通过script的src标签发起一个get请求，这种请求方式不受同源策略限制，请求参数为事先定义好的回调函数，服务端返回改回调函数，前端拿到该回调函数后立即执行，也就拿到了执行的响应数据）。
缺点：只能发起get请求
JSONP 的CSRF攻击（获取用户信息、执行危险的删除操作等。使用token验证机制预防）
XSS漏洞 （设置content-type、以及特殊字符转义使其不能执行来进行预防）
+ CORS（跨域资源共享）
> 简单请求：服务端设置响应头 **Access-Control-Allow-Methods** **Access-Control-Allow-Headers** **Access-Control-Allow-origin** 分别指定允许的方法、头部、源信息。复杂请求（自定义header等，会进行一次预检请求）： **Access-Control-Request-Headers**  **Access-Control-Request-Method**
+ nginx 代理

## 6.http2 和 http1 的区别
+ 二进制传输：http2 采用二进制传输，相较于文本传输的 http1 来说更加安全可靠
+ 多路复用：http1 一个连接只能提交一个请求，而 http2 可以同时处理无数个请求，可以降低连接的占用数量，进一步提升网络的吞吐量
+ 头部压缩：http2 通过 gzip 和 compress 对头部进行压缩，并且在客户端与服务端各维护了一份头部索引表，只需要根据索引 id 就可以进行头部信息的传输，缩小了头部容量，间接提高了传输效率
+ 服务端推送：服务端可以主动推送资源给客户端，避免客户端花过多的时间逐个请求资源，这样可以降低整个请求的响应时间

## 7.缓存
> 缓存分为强缓存和协商缓存。强缓存不经过服务器，协商缓存需要经过服务器，协商缓存返回的状态码是 304。两类缓存可同时存在，但是强缓存的优先级高于协商缓存。
### 强缓存
+ Expires(http1.0):expires 的值为服务端返回的数据到期时间，当再次请求的时间小于返回的时间，则直接使用缓存数据。它是 http1的产物，现一般使用 Cache-control 代替。 缺点：使用的是绝对时间，如果服务端和客户端存在时间偏差那么会导致命中缓存产生偏差
+ Pragma（http1）：HTTP1.0 时的遗留字段，当值为 no-cache 时强制验证缓存，Pragma禁用缓存，如果又给 Expires 定义一个还未到期的时间，那么 Pragma 字段的优先级会更高，服务器响应添加 Pragma:'no-cache',浏览器表现行为和刷新（F5）类似。
+ Cache-Control(http1.1),它有以下属性可选
    1. private：客户端可以缓存
    2. public：客户端和代理服务器都可以缓存
    3. max-age=t：缓存内容将在 t 秒后失效
    4. no-cache：需要使用协商缓存来验证缓存数据
    5. no-store：所有内容都不会缓存
### 协商缓存
+ Last-Modified：服务器在响应请求时，会告诉浏览器资源的最后修改时间
+ if-Modified-Since：浏览器再次访问资源时会将服务器第一次返回的资源最后修改时间携带在请求头上，服务器会根据改时间与当前资源的最后修改时间进行比对，如果一样状态码则为 304，浏览器则使用缓存数据，如果时间不一样则返回最新数据给浏览器，且状态码为 200.
+ Etag：服务器响应请求时，通过此字段告诉浏览器当前资源在服务器上的唯一标识
+ if-none-match：再次请求服务器时，浏览器的请求报文头部会包含此字段，值为缓存中获取的标识，服务器接收到报文后发现IF-none-match 则与被请求资源的唯一标识进行比对。
### 缓存场景
+ 大部分场景都可以使用强缓存配合协商缓存解决

## 8.能说说首屏加载优化有哪些方案么？
+ Vue-Router路由懒加载（利用webpack的代码切割）
+ 使用 CDN 加速
+ Nginx 的 gzip 压缩
+ Vue 异步组件
+ 服务端渲染 SSR
+ UI 组件库按需加载
+ Webpack 开启 gzip 压缩
+ 使用 link 标签的 rel 属性设置 prefetch（通常用于加速下一次导航）、preload

## 9.谈谈你对作用域链的理解
+ 执行上下文：变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的**变量对象**，上下文定义的变量和函数都存在于这个对象上。
+ 上下文中的代码在执行的时候，会创建变量对象的一个作用域链。这个作用域链决定了各级上下文的代码在访问变量和函数时的顺序。
+ 代码正在执行的上下文的变量对象始终位于作用域链的最前端。作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文，以此类推直至全局上下文。
+ 代码执行时标识符解析是通过沿着作用域链逐级搜索的，从作用域链的最前端开始搜索，直到找到标识符。
## 10.如何在Node端配置路径别名（类似于Webpack中的alias配置）

## 11.null 和 undefined 的区别？
+ 两种类型都只有一个值那就是它们本身
+ null 表示不存在的对象，空对象的引用。转布尔值为 false，转数值为 0。用于表示原型链的终点
+ undefined 表示变量定义了但是未赋值，如函数的形参没有传入实参，对象没有赋值的属性，函数没有返回值时默认返回 undefined。转布尔值为 false，转数值为 NaN

## 12.闭包
>

