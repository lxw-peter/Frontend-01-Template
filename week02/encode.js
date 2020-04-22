function encode(str) {
    let result = encodeURIComponent(str).replace(/%/gm, ',0x').split(',');
    !result[0] && result.shift();
    return result;
}

console.log(encode('你好啊')) // ["0xE4", "0xBD", "0xA0", "0xE5", "0xA5", "0xBD", "0xE5", "0x95", "0x8A"]
