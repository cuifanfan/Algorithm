Array.prototype.swap = function (a, b) {
  [this[a], this[b]] = [this[b], this[a]];
};

// 1.选择排序
// 时间复杂度为O(N²)，比较N-1+N-2+N-3+...+2+1 => 比较(N-1)*N/2次、赋值(N-1)*N/4次，交换N次
// 空间复杂度O(1);就i,j,minIndex三个变量，每次循环开始minIndex重新申请，当前循环结束minIndex和j都回收
Array.prototype.selectionSort = function () {
  if (this.length < 2) return;
  for (let i = 0; i < this.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < this.length; j++) {
      if (this[j] < this[minIndex]) minIndex = j;
    }
    this.swap(i, minIndex);
  }
};

// 2.冒泡排序
// 时间复杂度为O(N²)，比较N-1+N-2+N-3+...+2+1 => 比较(N-1)*N/2次，交换(N-1)*N/4次
// 空间复杂度O(1),全程就i和每轮循环的j
Array.prototype.bubbleSort = function () {
  if (this.length < 2) return;
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] > this[j]) this.swap(i, j);
    }
  }
};

// 3.插入排序
// 适用于局部有序的情况
// 时间复杂度O(N²)，(N-1)*(1+(1/2+2*1/4)+(1/2+2*1/4+3*1/8)+...),最好为O(N),最差为O(N²)
// 空间复杂度O(1 )
Array.prototype.insertSort = function () {
  if (this.length < 2) return;
  for (let i = 1; i < this.length; i++) {
    // 认为i以前是有序的
    let j = i - 1;
    let temp = this[i];
    while (this[j] && this[j] > temp) {
      this[j + 1] = this[j];
      j--;
    }
    // j=-1或者this[j]<=temp
    this[j + 1] = temp;
  }
};

let arr = [4, 3, 2, 1, 0, 6, 5, 4, 3, 2];
// arr.bubbleSort();
arr.insertSort();
console.log(arr);
