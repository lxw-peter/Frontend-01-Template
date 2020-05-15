 /**
  * 匹配某一个字符串中是否包含 ‘abababx’ 子串
  * 
  *  */ 

 function match(string) {
    let state = start;
    for (let c of string) {
        console.log(c);
        state = state(c);
    }
    return state === end;
}

let count = 0;
function start(c) {
    if (c === 'a') {
        return foundA;
    } else if (c === 'x' && count > 2) {
        console.log('count', count);
        count = 0;
        return end;
    } else {
        return start;
    }
}

// 返回自己
function end() {
    return end;
}

function foundA(c) {
    if (c === 'b') {
        count++;
    }
    return start(c);
}

console.log(match('fsdf sdfdabababxfsdf'));   // true
console.log(match('fsdfsdfdababababxfsdfadf'));    // true
