let pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]
let player1 = '⭕️';
let player2 = '❌';
let flag = 1;

function render() {
  let board = document.querySelector('.board');
  board.innerHTML = '';
  pattern.forEach((items, i) => {
    items.forEach((item, j) => {
      let box = document.createElement('div');
      box.className = 'box';
      if (box.innerText) {
        return;
      }
      item === 2 && (box.innerText = player2);
      item === 1 && (box.innerText = player1);
      box.addEventListener('click', () => userMove(i, j))
      board.appendChild(box);
    })

    board.appendChild(document.createElement('br'));
  })
}


// 用户落子
function userMove(x, y) {
  pattern[x][y] = flag;
  if (check(pattern, flag)) {
    alert(flag === 2 ? '❌ is winner' : '⭕️ is winner');
  }
  flag = 3 - flag;
  render();
  computerMove();
  if (willWin(pattern, flag)) {
    console.log(flag === 2 ? '❌ will win' : '⭕️ will win');
  }
}

// 机器落子
function computerMove() {
  let choice = bestChoice(pattern, flag);
  if (choice.point) {
    pattern[choice.point[1]][choice.point[0]] = flag;
  }
  if (check(pattern, flag)) {
    alert(flag === 2 ? '❌ is winner' : '⭕️ is winner');
  }
  flag = 3 - flag;
  render();
}

// 确认胜负
function check(pattern, flag) {
  // row
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== flag) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  // 纵向
  for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== flag) {
        win = false;
      }
    }
    if (win)
      return true;
  }
  // 反对角线
  {
    let win = false;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][2 - j] !== flag) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  // 对角线
  {
    let win = false;
    for (let j = 0; j < 3; j++) {
      if (pattern[j][j] !== flag) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  return null
}

// 拷贝数组
function clone(pattern) {
  return JSON.parse(JSON.stringify(pattern));
}

// 胜利判断
function willWin(pattern, flag) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== 0) {
        continue;
      } else {
        let tmp = clone(pattern);
        tmp[i][j] = flag;
        if (check(tmp, flag)) {
          return true;
        };
      }
    }
  }
  return null;
}

// 棋谱功能
let openings = new Map();

openings.set([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
].toString(), {
  point: [1, 1],
  result: 0
})

// 最佳落子点和结果
function bestChoice(pattern, flag) {
  if (openings.has(pattern.toString())) {
    return openings.get(pattern.toString());
  }
  let point = willWin(pattern, flag);
  if (point) {
    return {
      point: point,
      result: 1 // 1 胜利， 0 平局， -1 落败
    }
  }

  let result = -1;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== 0) {
        continue;
      }

      let tmp = clone(pattern);
      tmp[i][j] = flag;
      let opp = bestChoice(tmp, 3 - flag);
      if (-opp.result >= result) {
        point = [j, i];
        result = -opp.result;
      }
    }
  }
  return {
    point: point,
    result: point ? result : 0
  }
}

render();