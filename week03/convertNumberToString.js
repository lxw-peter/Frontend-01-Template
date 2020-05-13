function convertNumberToString(number, x=10) {
    if (number === 0) return 0; 
    let integer = Math.floor(number);
    let fraction = (number - integer).toString(x);
    let string = '';
    while (integer > 0) {
        string = String(integer % x) + string;
        integer = Math.floor(integer / x);
    }
     return fraction && fraction != '0' ? `${string}${fraction}` : string;
}

function test(result, number, x) {
    return result === number.toString(x);
}

let result1 = convertNumberToString(10, 2);
let result2 = convertNumberToString(0.23, 2);
let result3 = convertNumberToString(1.23e3, 2);


console.log(test(result1, 10, 2));
console.log(test(result2, 0.23, 2));
console.log(test(result3, 1.23e3, 2));



/* 参考 */
function numberToString (number, x) {
    if (typeof number !== 'number' && typeof number !== 'string') {
      throw new Error(`${number} should be number`)
    }
    if (Number.isNaN(number)) {
      return 'NaN'
    }
    if (number === 0) {
      return '0'
    }
    x = x || 10
    var symbol = number < 0 ? '-' : '' // 基于+0, -0已被排除的情况
    if (Math.abs(number) === Infinity) {
      string += Math.abs(number)
      return string
    }
    number = Math.abs(number)
    var integer = Math.floor(number)
    var fraction = number - integer
    var string = ''
    while (integer > 0) {
      let char = integer % x
      if (char > 9) {
        char = String.fromCharCode(char + 55)
      }
      string = char + string
      integer = Math.floor(integer / x)
    }
    if (fraction) {
      string += '.'
    }
    while (Math.floor(fraction) < fraction) {
      fraction = fraction * x
      string = string + Math.floor(fraction % 10)
    }
    string = symbol + string
    return string
  }
  
  // 测试
  void (function () {
    console.log(numberToString(29822)) // "29822"
    console.log(numberToString(0xaf)) // "175"
    console.log(numberToString(0xaf, 2)) // "10101111"
    console.log(numberToString(0xaf, 16)) // "AF"
    console.log(numberToString(-0xaf, 16)) // "-AF"
  }())