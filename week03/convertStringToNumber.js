function convertStringToNumber(string, x=10) {
    let chars = string.split('');
    let _ = '';
    if (string.startsWith('-')) {
        chars.shift();
        _ = '-'
    }

    let reg = /e|E/;
    let number = 0;
    let letters = {
        'a': '10',
        'b': '11',
        'c': '12',
        'd': '13',
        'e': '14',
    }
    let i = 0;
      // 小数
      if (x === 10) {
        while (i < chars.length && !reg.test(i)) {
            fraction = fraction / x;
            number += (chars[i].codePointAt(0) - '0'.codePointAt(0))
            i++;
        }
        // 指数计算
        let newChars = chars.join('');
        if (reg.test(newChars)) {
            newChars.replace(reg, ',').split(',');
            number = (+newChars[0]) ** (+newChars[1])
        }
        return _ ? -number : +number;
    }

    if (x === 16) {
        while (letters[chars[i]]) {
            number *= x;
            number += letters[chars[i]]
            i++;
        }
        return _ ? -number : +number;
    }

    while (i < chars.length && chars[i] !== '.' && !letters[chars[i]]) {
        number = number * x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0))
        i++;
    }

    if (chars[i] === '') i++;
    let fraction = 1;
    while (i < chars.length) {
        fraction = fraction / x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0))
        i++;
    }

    return _ ? -number : +number;
}

let result1 = convertStringToNumber('11', 2);
let result2 = convertStringToNumber('abc', 16);
let result3 = convertStringToNumber('2.3e3', 2);
let result4 = convertStringToNumber('23.45', 2);
let result5 = convertStringToNumber('-11', 2);

function test(result, string, x) {
    console.log(result);
    return string === result.toString(x);
}

console.log(test(result1, '11', 2));
// 有 bug
console.log(test(result2, 'abc', 16));
console.log(test(result3, '2.3e3', 2));
console.log(test(result4, '23.45', 2));

/* 参考 */
function stringToNumber (string, x) {
    if (typeof string !== 'string') {
      return NaN
    }
    if (x && (typeof x !== 'number' || /\./.test(x) || x < 2 || x > 36)) {
      // x 不符合要求
      return NaN
    }
    string = string.trim()
    var regexp = x === 10 ? /(-?)(0?)([\d,]*)(\.?)(\d*)(e?)([+-]?)(\d*)/ : /(-?)(0?[Xxob]?)([\da-fA-F]+)(\.?)([\da-fA-F]*)/
    var matchRes = string.match(regexp)
    var symbol = matchRes[1]
    var radix = matchRes[2]
    var integer = matchRes[3].replace(',', '')
    // var decimalPoint = matchRes[4]
    var decimal = matchRes[5]
    var e = matchRes[6]
    var eSymbol = matchRes[7]
    var exponent = matchRes[8]
    if (radix && !x) {
      // 如果没有传进制，又有匹配结果，则根据匹配出的进制转换
      if (radix.toLowerCase() === '0x') {
        x = 16
      } else if (radix.toLowerCase() === '0o') {
        x = 8
      } else if (radix.toLowerCase() === '0b') {
        x = 2
      } else {
        x = 10
      }
    }
    x = x || 10
    var CODE_OF_ZERO = '0'.charCodeAt(0)
    var CODE_OF_A = 'A'.charCodeAt(0)
    var CODE_OF_Z = 'Z'.charCodeAt(0)
    var num
    var charCode
    var integerNum = 0
    for (let i = 0; i < integer.length; ++i) {
      charCode = integer[i].toUpperCase().charCodeAt(0)
      if (x <= 36 && x >= 11) {
        // 大于10进制
        if (charCode >= CODE_OF_A && charCode <= CODE_OF_Z) {
          num = charCode - 55 // 'A'对应的数字是10
        } else {
          num = charCode - CODE_OF_ZERO
        }
      } else {
        num = charCode - CODE_OF_ZERO
      }
      if (num >= x) {
        // 某一位超出当前进制了
        return NaN
      }
      integerNum = integerNum * x
      integerNum += num
    }
    var decimalNum = 0
    let i = decimal.length
    while (i--) {
      charCode = decimal[i].toUpperCase().charCodeAt(0)
      if (x <= 36 && x >= 11) {
        // 大于10进制
        if (charCode >= CODE_OF_A && charCode <= CODE_OF_Z) {
          num = charCode - 55 // 'A'对应的数字是10
        } else {
          num = charCode - CODE_OF_ZERO
        }
      } else {
        num = charCode - CODE_OF_ZERO
      }
      if (num >= x) {
        // 某一位超出当前进制了
        return NaN
      }
      decimalNum = decimalNum / x
      decimalNum = decimalNum + num / x
    }
    var result = integerNum + decimalNum
    if (x === 10 && e && exponent) {
      // 10 进制且是科学计数法
      var eRes
      if (eSymbol === '-') {
        exponent = -exponent
      }
      result = result * (10 ** exponent)
    }
    if (symbol === '-') {
      // 符号位
      result = -result
    }
    return result
  }
  
  // 测试用例
  void (function () {
    console.log(stringToNumber("0xF", 16)); // 15
    console.log(stringToNumber("F", 16)); // 15
    console.log(stringToNumber("17", 8)); // 15
    console.log(stringToNumber("015", 10));   // console.log(stringToNumber(015, 10); 返回 15
    console.log(stringToNumber('15.99', 10)); // 15.99
    console.log(stringToNumber("15,123", 10)); // 15123 将逗号去掉了
    console.log(stringToNumber("FXX123", 16)); // 15
    console.log(stringToNumber("1111", 2)); // 15
    console.log(stringToNumber("15e2", 10)); // 1500
    console.log(stringToNumber("15px", 10)); // 15 舍弃掉了'px'
    console.log(stringToNumber("12", 13)); // 15
    // 以下例子均返回 NaN:
  
    console.log(stringToNumber("Hello", 8)); // 根本就不是数值 NaN
    console.log(stringToNumber("546", 2));   // 除了“0、1”外，其它数字都不是有效二进制数字
    // 以下例子均返回 -15：
  
    console.log(stringToNumber("-F", 16)); // -15
    console.log(stringToNumber("-0F", 16)); // -15
    console.log(stringToNumber("-0XF", 16)); // -15
    console.log(stringToNumber('-15.1', 10)); // -15.1
    console.log(stringToNumber(" -17", 8)); // -15
    console.log(stringToNumber(" -15", 10));
    console.log(stringToNumber("-1111", 2)); // -15
    console.log(stringToNumber("-15e1", 10)); // -150
    console.log(stringToNumber("-12", 13)); // -15
  
  
    console.log(stringToNumber(0.00000000000434, 10)); // 4.340000000000001e-12
    }())