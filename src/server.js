let str = "aaa bbb ccc aspASDAdka"
let splitted = str.toLowerCase().split(' ').map(word => word[0].toUpperCase()+word.slice(1))
console.log(splitted.join(' '))