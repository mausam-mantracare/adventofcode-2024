const fs = require("node:fs")

const data = fs.readFileSync(process.argv[2], "utf-8")
const lines = data.split("\n").map(ln => ln.split(""))



function getInputString(lines){

    const result = new Map()
    lines.forEach((line, i) => {
        line.forEach((el, j) => {
            if(!result.has(el)) result.set(el, [])
            result.get(el).push({row: i, col: j})
        })
    })

    return result;
}

const input = getInputString(lines);
console.log(input)