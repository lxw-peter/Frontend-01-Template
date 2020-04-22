# 第二周总结 [4/16 , 4/18]

## [编程语言通识](https://mubu.com/doc/6_OTLxvwGW)

## [重学JavaScript](https://mubu.com/doc/5ogkhXytRW)

## 课后作业

### 1. 写一个正则表达式 匹配所有 Number 直接量

```js
/*
    小数        /^0?\.\d+$/
    二进制      /^0[bB][01]+$/
    八进制      /^0[oO][0-7]+$/
    十进制      /^\d+$/
    十六进制    /^0[xX][0-9a-fA-F]+$/
    负数        eg: /^-\d+$/
    科学计数法   /^(\.\d+|(0|[1-9]\d*)\.?\d*?)([eE][-\+]?\d+)?$/
*/
/^-?|0[bB][01]+$|0[oO][0-7]+$|\d+$|0[xX][0-9a-fA-F]+$|(\.\d+|(0|[1-9]\d*)\.?\d*?)([eE][-\+]?\d+)?$/
```

### 2. 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

```js
/*
    单引号       \'
    双引         \"
    \           \\
    <LF>        \n
    <CR>        \r
    <CRLF>      \r\n
    <TAB>       \t
    <LS>        u2028
    <PS>        u2029
    数字(进制)   [0-9]  
                二进制      /^0[bB][01]+$/
                八进制      /^0[oO][0-7]+$/
                十六进制    /^0[xX][0-9a-fA-F]+$/
    英文字母     [a-zA-Z]
    Unicode     u{0}-\u{10ffff}
 */
/^['"\\\n\r\t]|\n\r|u([0-9a-fA-F]{4}|\{(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}\})|0[bB][01]+|0[oO][0-7]+|0[xX][0-9a-fA-F]+|$/
```

### 3. [写一个 UTF-8 Encoding 的函数](https://github.com/lxw-peter/Frontend-01-Template/blob/master/week02/encode.js)
