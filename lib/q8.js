let readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal:false
});

class Monkey {
    constructor(){
    }

    eatPeachForHour(trees, speed){
        if(trees[0]){
            if(trees[0] > speed){
                trees[0] -= speed
            }else{
                trees.shift();
            }
            return false;
        }else{
            return true;
        }
    }

    eatUpATree(trees, speed){
        if(trees[0]){
            let spent = Math.floor(trees[0]/speed);
            if(trees[0] % speed != 0){
                spent += 1;
            }
            trees.shift();
            return spent
        }else{
            return 0;
        }
    }

    eatPeaches(trees, speed, spent=0){
        if(trees[0]){
            let spentForTree = this.eatUpATree(trees, speed);
            if(!spentForTree){
                return spent;
            }else{
                return this.eatPeaches(trees, speed, spent+spentForTree);
            }
        }else{
            return spent;
        }
    }
}


let n = -1;// 初始状态为负数，表示还没开始读取
let ans = 0;
rl.on('line', function(line){ // javascript每行数据的回调接口
        try{
            let trees = line.split(' ').map((element)=>{
                let num = Number(element);
                if(typeof num == "number" && num > 0){
                    return num;
                }else{
                    throw new Error('input illeagel');
                }
            });
            if(trees.length == 1){
                throw new Error('invalid tree number');
            }
            let hourLimit = trees.pop();
            
            if(trees.length > hourLimit){
                throw new Error(`impossible mission: ${trees.length} vs ${hourLimit}`);
            }
            let monkey = new Monkey(); 
            let speed = 1;
            let eatUp = false;
            while(!eatUp){
                let temp_trees = [];
                trees.forEach((tree)=>{
                    temp_trees.push(tree);
                });
                let spent = monkey.eatPeaches(temp_trees, speed);
                if(spent<=hourLimit){
                    eatUp = true;
                }else{
                    speed += 1;
                }
            }
            console.log(speed);

        }catch(e){
            console.log(-1);
        }
});