let sort = require('../sort.js');

let arr = [];
let n = 10;
for(let i = 0;i<n; i++){
    let value = Math.floor(Math.random()*n*10);
    arr.push({
        value: value
    })
}
console.log(`arr generated!`);

let new_arr;
console.log(arr);
let timestamp_1 = new Date().getTime();
try{
    new_arr = sort.mergeSort(arr, "value");
}catch(e){
    console.error(e);
}
let timestamp_2 = new Date().getTime();
console.log(`${timestamp_2-timestamp_1} ms`);
console.log(new_arr);