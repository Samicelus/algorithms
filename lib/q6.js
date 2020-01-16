class Monkey {
    constructor(){
    }

    share(peaches, monkeys){
        let left = peaches % monkeys;
        let share = (peaches - left) / monkeys;
        let rest = peaches -left - share;
        return {
            peaches,
            left,
            share,
            rest
        }
    }
}

let monkey = new Monkey();
let monkeys = 5;
let left = 1;
let peaches = 1;
let found = false;
let logs = [];

while(!found){
    let rest = peaches;
    let unfear = 0;
    logs = [];
    for(let i = monkeys; i>0 ; i--){
        let result = monkey.share(rest, monkeys);
        rest = result.rest;
        if(result.left !=  left || result.share == 0){
            unfear++;
        }else{
            logs.push(result);
        }
    }
    if(!unfear){
        found = true;
    }else{
        peaches += 1;
    }
}

console.log(`the min peaches is ${peaches}`);
console.log(logs);