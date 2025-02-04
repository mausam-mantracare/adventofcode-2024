import { readFile, readFileSync } from "fs";


const regex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
const data = readFileSync(process.argv[2], "utf-8")

let m;
let result = 0;

while ((m = regex.exec(data)) !== null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    result += m[1] * m[2]
}

console.log("RegMul", result)