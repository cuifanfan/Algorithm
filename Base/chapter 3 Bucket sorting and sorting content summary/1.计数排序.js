// 计数排序(有限条件下：比如员工的年龄等，小区间)

function count_sort(arr) {
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


  const help = new Array(2 * max + 1).fill(0)
  for (let i = 0; i < arr.length; i++) {
    help[arr[i]]++
  }
  let k = 0
  for (let i = 0; i < help.length; i++) {
    for (let j = 0; j < help[i]; j++) {
      arr[k++] = i
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] -= max
  }
}


// 测试的方法
function testMethod(arr) {
  count_sort(arr)
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