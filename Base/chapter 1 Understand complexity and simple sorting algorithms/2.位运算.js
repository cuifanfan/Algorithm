// 异或还可以理解为无进位相加
// 1) 0^n = n
// 2) a^b = b^a  a^b^c = a^c^b = c^b^a (满足交换律)

// 能这么做的原因是因为a、b、c在内存中是独立的,尽量别这样写
// 在数组中必须是不同位置的值进行交换，如果自己和自己交换，会被洗成0
// let a = 1;
// let b = 2;
// a = a ^ b;
// b = a ^ b; // a ^ b ^ b = a
// a = a ^ b; // a ^ b ^ a = b

// (1)数组中只有一种数，出现了奇数次，其他所有数都出现了偶数次，怎么找出出现了奇数次的数字？
// (2)数组中有两种数出现了奇数次，其余所有数都出现了偶数次，怎么找出这两种数

// 要求：时间复杂度O(N),空间复杂度O(1)
// (1):
// let arr1 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 6, 7, 7];
// let result = 0;
// for (let i = 0; i < arr1.length; i++) {
//   result ^= arr1[i];
// }
// console.log(result);

// (2):
let arr1 = [1, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8];
let result = 0;
for (let i = 0; i < arr1.length; i++) {
  result ^= arr1[i];
}
// result = a ^ b // a,b不相等=> a,b至少一位不相等=>result至少一位是1
let rightOne = result & (~result + 1);

let onlyOne = 0;

for (let i = 0; i < arr1.length; i++) {
  if ((arr1[i] & rightOne) === 0) {
    onlyOne ^= arr1[i];
  }
}

console.log(onlyOne);
console.log(onlyOne ^ result);
