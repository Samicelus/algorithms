var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

class PlaceRec {
    constructor(){
        this.recs = [];
        this.target = {};
        this.size = {};
        this.hasTarget = false;
        this.forbiddenAreas = [];
    }

    addRec(rec){
        this.recs.push(rec);
    }

    setTarget(target){
        this.target = target;
        this.hasTarget = true;
    }

    setSize(size){
        this.size = size;
    }

    isInArea(loc, area){
        if(loc.x>=area.x0 && loc.x<=area.xt && loc.y>=area.y0 && loc.y<=area.yt){
            return true;
        }else {
            return false;
        }
    }

    getNearBys(area){
        let nearbys = [];
        for(let x = area.x0; x<= area.xt; x++){
            nearbys.push({
                x,
                y: area.y0-1
            });
            nearbys.push({
                x,
                y: area.yt+1
            })
        }
        for(let y = area.y0; y<= area.yt; y++){
            nearbys.push({
                x: area.x0-1,
                y,
            });
            nearbys.push({
                x: area.xt+1,
                y,
            })
        }
        return nearbys;
    }

    getForbiddenAreas(){
        let that = this;
        this.recs.forEach((rec)=>{
            that.forbiddenAreas.push({
                x0: rec.x - that.size.w,
                y0: rec.y - that.size.h,
                xt: rec.x + rec.w,
                yt: rec.y + rec.h
            })
        });
    }

    getAllNearBys(){
        let that = this;
        let tempNearbys = [];
        let allNearBys = [];
        this.forbiddenAreas.forEach((area)=>{
            let currentNearbys = that.getNearBys(area);
            tempNearbys = tempNearbys.concat(currentNearbys);
        });
        
        this.forbiddenAreas.forEach((area)=>{
            tempNearbys.forEach((loc)=>{
                if(!loc.isInForbidden && that.isInArea(loc, area)){
                    loc.isInForbidden = true;
                }
            })
        });
        let exists_loc_str = [];
        tempNearbys.forEach((loc)=>{
            let loc_str = `${loc.x} ${loc.y}`;
            if(!exists_loc_str.includes(loc_str)){
                if(!loc.isInForbidden){
                    allNearBys.push(loc);
                    exists_loc_str.push(loc_str);
                }
            }
        });
        return allNearBys;
    }

    getNearestLoc(){
        let that = this;
        this.getForbiddenAreas();
        this.forbiddenAreas.forEach((area)=>{
            if(!that.target.isInForbidden && that.isInArea(that.target, area)){
                that.target.isInForbidden = true;
            }
        })

        if(!this.target.isInForbidden){
            return {locs:[this.target], distance:0}; 
        } else {
            let allNearBys = this.getAllNearBys();
            if(Array.isArray(allNearBys) && allNearBys[0]){
                let distance = this.getDistance(allNearBys[0], this.target);
                let nearestLocs = [allNearBys[0]];
                for(let index in allNearBys){
                    if(index != 0){
                        let loc = allNearBys[index];
                        let new_distance = this.getDistance(loc, this.target);
                        if(new_distance == distance){
                            nearestLocs.push(loc);
                        } else if(new_distance < distance){
                            nearestLocs = [loc];
                            distance = new_distance;
                        }
                    }
                }
                return {locs:nearestLocs, distance}; 
            }
        }       
    }

    getDistance(loc1, loc2){
        let xDis = Math.abs(loc1.x - loc2.x);
        let yDis = Math.abs(loc1.y - loc2.y);
        return xDis*xDis+yDis*yDis;
    }
}

let n = -1; //测试用例数
let current_recs = 0;
let place;
rl.on('line', function(line){
    if(n < -1){
        n = parseInt(line.trim())
    }else if( line.split(' ').length>1){
        let data = line.split(' ');
        console.log(place.recs);
        if(!place.hasTarget){
            let target = {
                x: parseInt(data[0]),
                y: parseInt(data[1])
            };
            let size = {
                w: parseInt(data[2]),
                h: parseInt(data[3])
            };
            place.setSize(size);
            place.setTarget(target);
        }else{
            let rec = {
                x: parseInt(data[0]),
                y: parseInt(data[1]),
                w: parseInt(data[2]),
                h: parseInt(data[3])
            };
            place.addRec(rec);
            current_recs -= 1;
        }
        //测试用例数据输入完毕
        if(current_recs == 0){
            let result = place.getNearestLoc();
            console.log(`${result.locs[0].x} ${result.locs[0].y} ${Math.sqrt(result.distance)}`);
            n -= 1;
        }
    }else{
        current_recs = parseInt(line.trim());
        place = new PlaceRec();
    }
})