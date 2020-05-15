 /**
  * 匹配某一个字符串中是否包含 ‘abcabx’ 子串
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

function start(c) {
    if (c === 'a') {
        return foundA;
    } else {
        return start;
    }
}

// 返回自己
function end(c) {
    return end;
}

function foundA(c) {
    if (c === 'b') {
        return foundB;
    } else {
        return start(c);
    }
}

function foundB(c) {
    if (c === 'c') {
        return foundC;
    } else {
        return start(c);
    }
}

function foundC(c) {
    if (c === 'a') {
        return found2A;
    } else {
        return start(c);
    }
}

function found2A(c) {
    if (c === 'b') {
        return found2B;
    } else {
        return start(c);
    }
}

function found2B(c) {
    if (c === 'x') {
        return end;
    } else {
        return start(c);
    }
}


console.log(match('fsdf sdfd ssabcabxsf fsdf'));   // true
console.log(match('fsdf sdfd abcabcabxsf fsdf'));  // false
