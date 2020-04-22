// 编码
function encode(str) {
    return Array.from(str).map(item => item.codePointAt().toString(16))
}

encode2('你好啊') // ["4f60", "597d", "554a"]

// 解码
function decode(params) {
    let result = ''
    if(Array.isArray(params)) {
        params.forEach(item => {
            result += String.fromCodePoint(parseInt(item, 16));
        })
        return result;
    } else {
        return String.fromCodePoint(parseInt(params, 16))
    }
}
decode(["4f60", "597d", "554a"]) // '你好啊'