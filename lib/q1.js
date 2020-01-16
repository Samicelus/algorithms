var readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var n = -1;

rl.on('line', function(line){
    if( n < 0 ){
        n = parseInt(line.trim())
    } else {
        let line_arr = line.split(' ');
        let cards = new Cards(line_arr, []);
        cards.reverse_all();
        console.log(cards.getHand());
    }
})

class Cards {
    constructor(desk, hand){
        this.desk = desk || [];
        this.hand = hand || [];
        this.current = "reverse_1";
    }

    reverse_1(){
        this.hand.unshift(this.desk.shift());
        this.current = "reverse_2";
    }

    reverse_2(){
        this.hand.unshift(this.hand.pop());
        this.current = "reverse_1";
    }

    reverse_all(){
        if(this.desk.length > 0){
            this[this.current]();
            this.reverse_all();
        }
    }

    show(){
        console.log(this.desk);
        console.log(this.hand);
    }

    getHand(){
        return this.hand.join(' ');
    }
}

let cards = new Cards(a, []);
cards.reverse_all();
cards.show();
