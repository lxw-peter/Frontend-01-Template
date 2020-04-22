// 返回字节序列
function encode(str) {
    return new TextEncoder('utf8').encode(str)
}
console.log(encode('你好啊')) // Uint8Array(9) [228, 189, 160, 229, 165, 189, 229, 149, 138]

function encode2(str) {
    let result = encodeURIComponent(str).replace(/%/gm, ',\\u0x').split('\\');
    result.shift();
    return result;
}

console.log(encode2('你好啊')) // ["u0xE4,", "u0xBD,", "u0xA0,", "u0xE5,", "u0xA5,", "u0xBD,", "u0xE5,", "u0x95,", "u0x8A"]