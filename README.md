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