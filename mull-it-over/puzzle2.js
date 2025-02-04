import { readFileSync } from "fs";


const regex = /do\(\)|don\'t\(\)|mul\((\d{1,3}),(\d{1,3})\)/gm;
const data = readFileSync(process.argv[2], "utf-8")

let result = 0;

const matches = [...data.matchAll(regex)]
console.log(matches.length);

let isEnabled = true;

matches.forEach(match => {

    switch(match[0]){
        case "don't()":
            isEnabled = false;
            break
        case "do()":
            isEnabled = true;
            break;
        
        default:
            if(match[0].indexOf("mul") !== -1 && isEnabled) result += match[1] * match[2]
    }
})

// for (const match in matches){
//     console.log(match)
// }
// while ((m = regex.exec(data)) !== null) {
//     if (m.index === regex.lastIndex) {
//         regex.lastIndex++;
//     }
    
//     result += m[1] * m[2]
// }

console.log("RegMul", result)