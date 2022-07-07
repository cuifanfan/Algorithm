// 堆：是个完全二叉树，分为大根堆和小根堆
function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

// 某个数处于index位置，往上继续移动(插入堆中)
function heapInsert(arr, index) {
  // 父节点的索引
  let pIndex = Math.floor((index - 1) / 2)
  while (pIndex >= 0 && arr[index] > arr[pIndex]) {
    swap(arr, index, pIndex)
    index = pIndex
    pIndex = Math.floor((index - 1) / 2)
  }
}

// 某个数在index位置，向下移动(维持堆结构)
function heapify(arr, index, size) {
  let left = 2 * index + 1
  while (left <= size) {
    // 有左孩子
    let largestIndex = left + 1 <= size && arr[left + 1] > arr[left] ? left + 1 : left

    // 不用再下移
    if (arr[index] >= arr[largestIndex]) return

    swap(arr, index, largestIndex)
    index = largestIndex
    left = 2 * index + 1
  }
}


function heap_sort(arr) {
  if (!arr || arr.length < 2) return

  // 把数组堆化
  // for (let i = 0; i < arr.length; i++) {
  //   heapInsert(arr, i)
  // }

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length - 1)
  }


  // size代表堆的范围 => [0-size]范围是最大堆
  let size = arr.length - 1
  while (size > 0) {
    // 交换堆中最大值与数组末尾值
    swap(arr, 0, size--)
    // 向下移动 保持堆的结构性
    heapify(arr, 0, size)
  }
}

// 测试的方法
function testMethod(arr) {
  heap_sort(arr)
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
    arr[i] = Math.floor((value + 1) * ((Math.random() - 0.5) * 2));
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


// 如果只是一个数组需要堆化，没必要一个个进行heapInsert() [时间复杂度nlog(n)]