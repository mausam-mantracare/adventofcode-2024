import { readFileSync } from "fs";

const data = readFileSync(process.argv[2], "utf-8")

const lines = data.split("\n")
const row = lines.length;
const col = lines[0].length;

const combos = ["MAS", "SAM"]

function checkX(linesArr, row , col){
    if ((row + 1 < linesArr.length && row - 1 >= 0) && (col + 1 < linesArr[0].length && col - 1 >= 0)){
        let ld = linesArr[row-1][col+1] + linesArr[row][col] + linesArr[row+1][col-1]

        let rd = linesArr[row-1][col-1] + linesArr[row][col] + linesArr[row+1][col+1]

        if(combos.includes(ld) && combos.includes(rd))
            return 1
        return 0
    }
}


let count = 0;
for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        if(lines[i][j] == "A"){
            let xmas = checkX(lines, i, j)
            if (xmas) count ++;
        }
    }
}


console.log(count)