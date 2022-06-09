const readline = require('readline');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let rows = [];
let k = -1; // 还没开始输入

r1.on('line', function (line) {
  if (k < 0) {
    k = parseInt(line.trim());
  } else {
    rows.push(line.trim());

    if (k === rows.length) {
      // 当输入的行数等于设定的k值，开始进行逻辑处理

      // 对数组中所有的元素进行排序
      let map = new Map();

      for (let i = 0; i < rows.length; i++) {
        let current = rows[i];
        let flag = true;
        for (let j = 1; j <= rows[i].length; j++) {
          // map为空
          if (map.size === 0) break;

          current = rows[i].slice(j) + rows[i].slice(0, j);
          if (map.has(current)) {
            // map中已经有了这个字符串
            flag = false;
            break;
          }
        }
        if (flag) {
          map.set(rows[i], rows[i]);
        }
      }
      // 输出结果
      console.log(map.size);
      // 状态重置
      rows.length = 0;
      k = -1;
    }
  }
});

// let rows = ['picture', 'turepic', 'icturep', 'word', 'ordw'];
// let map = new Map();

// for (let i = 0; i < rows.length; i++) {
//   let current = rows[i];
//   let flag = true;
//   for (let j = 1; j <= rows[i].length; j++) {
//     // map为空
//     if (map.size === 0) break;

//     current = rows[i].slice(j) + rows[i].slice(0, j);
//     if (map.has(current)) {
//       // map中已经有了这个字符串
//       flag = false;
//       break;
//     }
//   }
//   if (flag) {
//     map.set(rows[i], rows[i]);
//   }
// }
// console.log(map.size);
