class TrieNode{
    constructor(){
        this.data = null;
        this.next = {};
        this.complete = false;
    }

    suggestNextWord(){
        return Object.keys(this.next);
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode()
    }

    addWord(word){
        let characters = word.split('');
        let index = 0;
        let currentNode = this.root;
        while(characters.length > index){
            if(currentNode.suggestNextWord().includes(characters[index])){
                currentNode = currentNode.next[characters[index]];   
            }else{
                let node = new TrieNode();
                node.data = characters[index];
                currentNode.next[characters[index]] = node;
                currentNode = node;
            }
            if(index == (characters.length - 1)){
                currentNode.complete = true;
            }
            index += 1;
        }
    }

    suggestNextCharacters(word){
        const lastCharacter = this.getLastCharacterNode(word);

        if (!lastCharacter) {
            return null;
        }

        return lastCharacter.suggestNextWord();
    }

    getLastCharacterNode(word){
        let currentNode = this.root;
        let characters = word.split('');
        for(let index = 0; characters.length > index; index++){
            if(currentNode.next[characters[index]]){
                currentNode = currentNode.next[characters[index]];
            }else{
                return null;
            }
        }
        return currentNode;
    }
}

class Filter{
    constructor(){
        this.trie = new Trie();
        this.meaninless = [];
        this.loadTrie = this.loadTrie.bind(this);
        this.filter = this.filter.bind(this);
        this.matchWord = this.matchWord.bind(this);
    }

    loadTrie(wordList){
        wordList.forEach((word) => {
            this.trie.addWord(word);
        });
    }

    loadMeaningless(meaninglessList){
        this.meaninless = this.meaninless.concat(meaninglessList);
    }

    filter(str, index){
        if(typeof str == 'string'){
            str = str.split('');
        }
        if(str[index]){
            let matchResult = this.matchWord(str[index], str, index, index, []);
            if(matchResult.result){
                let last = matchResult.last;
                let toReplace = matchResult.matched;
                toReplace.forEach((index)=>{
                    str.splice(index,1,"*");
                });
                if(str[last+1]){
                    return this.filter(str, last+1);
                }else{
                    return str.join('');
                }
            }else{
                if(str[index+1]){
                    return this.filter(str, index+1);
                }else{
                    return str.join('');
                }
            }
        }else{
            return str.join('');
        }
    }

    matchWord(word, str, begin, current, matched){
        matched.push(current);
        let suggestion = this.trie.suggestNextCharacters(word);
        if(suggestion == null){
            return {result: false};
        }
        if(suggestion.length == 0){
            return {result: true, matched, last:current, word}
        }else{
            current += 1;
            let nextChar = str[current];
            while(this.meaninless.includes(nextChar)){
                current += 1;
                nextChar = str[current];
            }
            let lastWordNode = this.trie.getLastCharacterNode(word);
            if(nextChar && suggestion.includes(nextChar)){
                return this.matchWord(word+nextChar, str, begin, current, matched);
            }else{
                if(lastWordNode.complete){
                    return {
                        result: true,
                        matched,
                        last: current,
                        word
                    }
                }else{
                    return {result: false}
                }
            }
        }
    }
}

let wordsList = [
    "bitch",
    "porn"
];

let meaninglessList = [
    "%",
    "*",
    "#"
]

let filter = new Filter();
filter.loadTrie(wordsList);
filter.loadMeaningless(meaninglessList);

let sentance = "you b#itc%h watch por%nsite!";

console.log(filter.filter(sentance, 0));