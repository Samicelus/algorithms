const array = [0,3,6,17,35,100,98,66,88,58,23,45,45,34,11];

/*  quick merge sort array
* in: array arr
* out: array rst
*/
function quickMergeSort(arr){
    if(arr.length <= 1){
        return arr;
    }
    let pivotIndex = Math.floor(arr.length /2);
    let pivot = arr[pivotIndex];
    let left = [];
    let right = [];
    for(let i = 0; i< arr.length; i ++){
        if(arr[i] < pivot){
            left.push(arr[i]);
        }else if(i != pivotIndex){
            right.push(arr[i]);
        }
    }
    return quickMergeSort(left).concat([pivot], quickMergeSort(right));
}

/*  print index of target number in an array, index will be ? if target is not found
* in: array arr, int target
* out: null
*/
function binarySearch(arr, target){
    let index = quickMergeSort(arr).indexOf(target);
    console.log(`${target} is in position ${index == -1?'?':index}`);
}

binarySearch(array, 66);
binarySearch(array, 51);