Array.prototype.mergeSort = function (left = 0, right = this.length - 1) {
  if (left >= right) return;
  let middle = Math.floor(left + ((right - left) >> 2));
  this.mergeSort(left, middle);
  this.mergeSort(middle + 1, right);
  this.merge(left, middle, right);
};

Array.prototype.merge = function (left, middle, right) {
  let i = left;
  let j = middle + 1;
  let k = 0;
  let result = new Array(right - left + 1);
  while (true) {
    if (i > middle) {
      while (j <= right) result[k++] = this[j++];
      break;
    }
    if (j > right) {
      while (i <= middle) result[k++] = this[i++];
      break;
    }
    if (this[i] > this[j]) result[k++] = this[j++];
    else result[k++] = this[i++];
  }

  for (let i = 0; i < result.length; i++) {
    this[i + left] = result[i];
  }
};

// 测试的方法
function testMethod(arr) {
  arr.mergeSort();
}

//正确的方法
function rightMethod(arr) {
  arr.sort((a, b) => a - b);
}
//随机数组生成器，size为最大长度，value为最大值
function generateRandomArray(size, value) {
  //生成长度随机的数组
  let arr = new Array(Math.floor((size + 1) * Math.random()));
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor((value + 1) * Math.random());
  }
  return arr;
}
//拷贝数组方法
function copyArray(arr) {
  if (arr == null) {
    return null;
  }
  return [].concat(arr);
}
//比对方法
function isEqual(arr1, arr2) {
  if ((arr1 == null && arr2 != null) || (arr1 != null && arr2 == null)) {
    return false;
  }
  if (arr1 == null && arr2 == null) {
    return true;
  }
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}
//测试
function Test() {
  let testTimes = 5000;
  let size = 10;
  let value = 100;
  let succeed = true;
  for (let i = 0; i < testTimes; i++) {
    let arr1 = generateRandomArray(size, value);
    let arr2 = copyArray(arr1);
    let arr3 = copyArray(arr1);
    testMethod(arr1);
    rightMethod(arr2);
    if (!isEqual(arr1, arr2)) {
      succeed = false;
      console.log(arr3);
      break;
    }
  }
  console.log(succeed ? 'nice' : 'Fucking fucked');
}
Test();
