class Sort{
    constructor(){
        this.quickMergeSort = this.quickMergeSort.bind(this);
        this.selectSort = this.selectSort.bind(this);
    }

    //利用array原型中提供的sort方法
    simpleSort(arr){
        arr.sort((a, b)=>{
            return a.date > b.date ? 1 : -1
        });
        return arr;
    }

    //插入排序:对每个元素循环，插入到新数组中的正确位置，使新数组正确排序
    insertSort(arr, path){
        "use strict";
        let new_arr = [arr[0]];
        for(let i = 1;i< arr.length; i++){
            insertElement(arr[i], new_arr, path)
        }
        return new_arr;
    }

    //阮一峰的排序:对数组进行分割，取中间位置元素作为基准，小值排左边，大值排右边，再对左右数组递归调用直到不可分割为止。
    quickMergeSort(arr){
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
        return this.quickMergeSort(left).concat([pivot], this.quickMergeSort(right));
    }

    //选择排序:从原数组中找出最小值并剔除，加入到新数组的最后一位
    selectSort(arr, new_arr){
        "use strict";
        if(arr.length > 0){
            let min_result = findMin(arr);
            new_arr.push(min_result.min);
            return this.selectSort(min_result.rest, new_arr);
        }else{
            return new_arr;
        }
    }

    //快速排序：选定一个基准数，左右搜索并以保证左边小于右边为原则调换基准数与搜索到的数位置，
    // 一轮搜索以后保证基准数左边的数字全小于基准数，右边全大于基准数。再对左右两边的子数组分别递归操作直到排序完成
    //效率高
    quickSort(arr, path){
        "use strict";
        return recurrence_quick(arr, 0, arr.length -1, path);
    }

    //归并排序：将数组分解成最小序列再将临近两个序列中元素按从小到大组合排序的方法，依次循环直到序列长度等于原数组
    //效率次于快速排序，但是优点是稳定（原本相等的两个元素排序后前后次序不变）
    mergeSort(arr, path){
        "use strict";
        let length = arr.length;
        let merge_length = 1;
        while(length > merge_length){
            //每次循环首次设置left，right和 origin_right
            let left = 0;
            let right = left + merge_length;
            let origin_right = right;
            let merge_end = origin_right + merge_length - 1;
            if(merge_end >= length){
                //超过length
                merge_end = length - 1;
            }
            //临时数组，用于存放小归并的新排序
            let temp_arr = [];
            //一次循环归并的终止条件为子归并完成后检查子归并的right是否小于总长
            while(right < length){
                //一次小归并，结束条件为left和right均为小序列的最大序
                while(left < origin_right || right < merge_end + 1 ){
                    let left_value = path ? getEmbeddedValue(arr[left],path) : arr[left];
                    let right_value = path ? getEmbeddedValue(arr[right],path) : arr[right];
                    if(left_value <= right_value){
                        temp_arr.push(arr[left]);
                        if(left < origin_right - 1){
                            left ++;
                        }else{
                            //左边push完毕，右边剩余的全部push，并将left和right置为结束状态
                            temp_arr = temp_arr.concat(arr.slice(right, merge_end + 1));
                            left = origin_right;
                            right = merge_end + 1;
                        }
                    }else{
                        temp_arr.push(arr[right]);
                        if(right < merge_end){
                            right ++;
                        }else{
                            //右边push完毕，左边剩余的全部push，并将left和right置为结束状态
                            temp_arr = temp_arr.concat(arr.slice(left, origin_right));
                            left = origin_right;
                            right = merge_end + 1;
                        }
                    }
                }
                //一次小归并结束后，用temp_arr替换内容
                replaceArr(arr, origin_right-merge_length, temp_arr);
                //重新设置left，right和 origin_right,此时 right 应该 为上次的origin_right + merge_length
                left = origin_right + merge_length;
                right = left + merge_length;
                origin_right = right;
                merge_end = origin_right + merge_length - 1;
                if(merge_end >= length){
                    //超过length
                    merge_end = length - 1;
                }
                temp_arr = [];
            }
            merge_length *= 2;
        }
        return arr;
    }
}

function findMin(arr){
    "use strict";
    let rest = [];
    let min_index = 0;
    for(let i = 1;i < arr.length; i++){
        if(arr[i] < arr[min_index]){
            rest.push(arr[min_index]);
            min_index = i;
        }else{
            rest.push(arr[i]);
        }
    }
    return {min:arr[min_index], rest:rest};
}

function insertElement(element, current_arr, path){
    "use strict";
    let position = Math.floor(current_arr.length /2);
    while(path?getEmbeddedValue(element, path):element < path?getEmbeddedValue(current_arr[position], path):current_arr[position]){
        position --;
    }
    while(path?getEmbeddedValue(element, path):element > path?getEmbeddedValue(current_arr[position], path):current_arr[position]){
        position ++;
    }
    current_arr.splice(position, 0, element);
}

function recurrence_quick(arr, left, right, path){
    "use strict";
    if(right - left > 0){
        let new_index = oneLoop(arr, left, right, path);
        if(left < new_index - 1){
            recurrence_quick(arr, left, new_index - 1, path);
        }
        if(new_index < right){
            recurrence_quick(arr, new_index+1, right, path);
        }
    }
    return arr;
}

function oneLoop(arr, left, right, path){
    "use strict";
    let i = left;
    let j = right;
    let key = path?getEmbeddedValue(arr[left], path):arr[left];
    let key_index = left;
    while(i < j){
        while(key <= (path?getEmbeddedValue(arr[j], path):arr[j]) && j>key_index){
            j--;
        }
        swap(arr, key_index, j);
        key_index = j;
        while(key >= (path?getEmbeddedValue(arr[i], path):arr[i]) && i<key_index){
            i++;
        }
        swap(arr, key_index, i);
        key_index = i;
        j--;
    }
    return i;
}

function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
}

function replaceArr(arr, start_index, temp_arr){
    "use strict";
    for(let index in temp_arr){
        [arr[start_index+Number(index)]] = [temp_arr[index]]
    }
}

function getEmbeddedValue(obj, keyName){
    let patt = /\./;
    if(patt.test(keyName)){
        //分割
        let firstkey = keyName.slice(0,keyName.search(patt));
        let restKey = keyName.slice(keyName.search(patt)+1);
        return getEmbeddedValue(obj[firstkey], restKey);
    }else{
        return obj[keyName];
    }
}

module.exports = new Sort();