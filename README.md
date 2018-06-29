# algorithms
实现一些算法并导出成实用类

- Sort : 排序类

#### 归并排序

  Sort.mergeSort(arr, [path])
  
#### 快速排序

  Sort.quickSort(arr, [path])
  
  
# Install：

```
$npm install algorithms-samicelus
```

# Example：

```
const sort = require('algorithms-samicelus').Sort;

let arr = [ { original_index: 0, info: { value: 48 } },
  { original_index: 1, info: { value: 47 } },
  { original_index: 2, info: { value: 15 } },
  { original_index: 3, info: { value: 81 } },
  { original_index: 4, info: { value: 12 } },
  { original_index: 5, info: { value: 62 } },
  { original_index: 6, info: { value: 59 } },
  { original_index: 7, info: { value: 34 } },
  { original_index: 8, info: { value: 0 } },
  { original_index: 9, info: { value: 21 } } ]

let new_arr = sort.mergeSort(arr, "info.value");

console.log(new_arr);
/*
expected output:
[ { original_index: 8, info: { value: 0 } },
  { original_index: 4, info: { value: 12 } },
  { original_index: 2, info: { value: 15 } },
  { original_index: 9, info: { value: 21 } },
  { original_index: 7, info: { value: 34 } },
  { original_index: 1, info: { value: 47 } },
  { original_index: 0, info: { value: 48 } },
  { original_index: 6, info: { value: 59 } },
  { original_index: 5, info: { value: 62 } },
  { original_index: 3, info: { value: 81 } } ]

*/
```
