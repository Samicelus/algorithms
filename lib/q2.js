var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class Paths{
    constructor(){
        this.paths = [];
    }

    add_line(line){
        let n1 = line[0];
        let n2 = line[1];
        let new_paths = [];
        for(let index in this.paths){
            let path = this.paths[index];
            if(path.includes(n1) && !path.includes(n2)){
                //console.log(path,' has ',n1, ' but no ', n2);
                let new_path = path.slice(0,path.indexOf(n1)+1).concat([n2]);
                this.addToPathSet(new_path,new_paths);
                let new_path2 = path.slice(path.indexOf(n1)).reverse().concat([n2]);
                if(new_path2.length>1){
                    this.addToPathSet(new_path2,new_paths);
                }
            }
            if(path.includes(n2) && !path.includes(n1)){
                //console.log(path,' has ',n2, ' but no ', n1);
                let new_path = path.slice(0,path.indexOf(n2)+1).concat([n1]);
                this.addToPathSet(new_path,new_paths);
                let new_path2 = path.slice(path.indexOf(n2)).reverse().concat([n1]);
                if(new_path2.length>1){
                    this.addToPathSet(new_path2,new_paths);
                }
            }
        }
        for(let new_path of new_paths){
            this.addToPathSet(new_path,this.paths);
        }
        this.addToPathSet(line,this.paths);
    }

    build_paths(arr){
        for(let line of arr){
            this.add_line(line);
        }
    }

    addToPathSet(path, path_set){
        let dup = false;
        path_set.forEach(o_path=>{
            if(Array.isArray(o_path) && o_path.join(' ') == path.join(' ')){
                dup = true;
            }
        });
        if(!dup){
            path_set.push(path);
        }
    }

    show_paths(){
        console.log(this.paths);
    }

    getMaxPath(){
        let max = 0;
        let current_path = [];
        this.paths.forEach(path=>{
            if(path.length>=max){
                max = path.length;
                current_path = path;
                //console.log(`found max path:`, current_path)
            }
        });
        return max;
    }
}

let n = -1; //测试用例数
let current_nodes = 0;
let current_array = [];
let paths;
rl.on('line', function(line){
    if(n < 0){
        n = parseInt(line.trim())
    }else if( line.split(' ').length>1){
        current_array.push(line.split(' '));
        current_nodes -= 1;
        if(current_nodes == 0){
            paths.build_paths(current_array);
            console.log(paths.getMaxPath() - 1);
            n -= 1;
        }
    }else{
        current_nodes = parseInt(line.trim());
        paths = new Paths();
    }
})