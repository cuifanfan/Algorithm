// 主要是改进了负数的情况

function radix_sort(arr) {
  if (arr === null || arr.length < 2) return
  let min = arr[0]
  let max = arr[0]
  for (let i = 0; i < arr.length; i++) {
    max = Math.max(arr[i], max)
    min = Math.min(arr[i], min)
  }
  // 所有数字加上max都会大于等于0
  max = Math.max(Math.abs(max), Math.abs(min))
  for (let i = 0; i < arr.length; i++) {
    arr[i] += max
  }
  radixSort(arr, 0, arr.length - 1, maxbits(arr))
  for (let i = 0; i < arr.length; i++) {
    arr[i] -= max
  }
}

function maxbits(arr) {
  // 数组最大元素有几位
  let max = Math.max(...arr)
  let k = 0
  while (max > 0) {
    max = Math.floor(max / 10)
    k++
  }
  return k
}

function getDigit(value, digit) {
  // 取得value第digit位的值 1表示个位，2表示百位
  let target = 0
  while (digit-- > 0) {
    target = value % 10
    value = Math.floor(value / 10)
  }
  return target
}

function radixSort(arr, begin, end, digit) {
  // 准备十个桶[0-9]
  const radix = 10
  // i是arr的索引，j是前缀和数组的索引
  let i = 0
  let j = 0
  const bucket = new Array(end - begin + 1)

  // 从开始按个位进行排序，依次到最高位
  for (let d = 1; d <= digit; d++) {
    // 前缀和数组：表示数组arr[i]d位<=j的值的个数
    const count = new Array(radix).fill(0)
    for (i = begin; i <= end; i++) {
      // 获得当前位的值
      j = getDigit(arr[i], d)
      count[j]++
    }
    for (j = 1; j < radix; j++) {
      count[j] = count[j] + count[j - 1]
    }
    // 按照d位排序，后入后出
    for (i = end; i >= begin; i--) {
      j = getDigit(arr[i], d)
      bucket[--count[j]] = arr[i]
    }

    for (i = begin; i <= end; i++) {
      arr[i] = bucket[i - begin]
    }
  }
}

// 测试的方法
function testMethod(arr) {
  radix_sort(arr)
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