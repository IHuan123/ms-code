let arr = [12, 4, 31, 65, 44, 6, 132, 1, 34, 65, 4, 64, 3, 13, 21, 31];

//冒泡排序
function sort(arr) {
    if(!Array.isArray(arr)) return;
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    }
    return arr;
}
// console.log('sort',sort(arr))
//快速排序
function quickSort(arr) {
    if (!Array.isArray(arr)) return;
    if (arr.length <= 1) return arr;
    let leftArr = [];
    let rightArr = [];
    let valueIndex = ~~(arr.length / 2);
    let piovt = arr.splice(valueIndex, 1)[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > piovt) {
            rightArr.push(arr[i])
        } else {
            leftArr.push(arr[i])
        }
    }
    return [...quickSort(leftArr), piovt, ...quickSort(rightArr)];
}
// console.log('quickSort',quickSort(arr))

//插入排序
function insertion(arr) {
    let current = 0,
        preIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        current = arr[i]; //当前
        preIndex = i - 1; //上一个
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--
            console.log(arr,preIndex+1,current)
        }
        
        arr[preIndex + 1] = current;
    }
    return arr;
}
var arr1 = [3, 5, 7, 1, 4, 56, 12, 78, 25, 0, 9, 8, 42, 37];
console.log('insertion',insertion(arr1));


//选择排序
function selectSort(arr) {
    var len = arr.length;
    var minIndex;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
    return arr;
}
// console.log('selectSort',selectSort(arr1))






//希尔排序
function shellSort(arr) {
    var len = arr.length;
    for (var gap = ~~(len / 2); gap > 0; gap = ~~(gap / 2)) {
        // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
        for (var i = gap; i < len; i++) {
            var j = i;
            var current = arr[i];
            while (j - gap >= 0 && current < arr[j - gap]) {
                arr[j] = arr[j - gap];
                j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}
// console.log(shellSort(arr1))

//归并排序
function mergeSort(arr) { //采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        // 不断比较left和right数组的第一项，小的取出存入res
        left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
    }
    return result.concat(left, right);
}
// console.log(mergeSort(arr1))