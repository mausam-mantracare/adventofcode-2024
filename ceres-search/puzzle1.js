import { readFileSync } from "fs";

const data = readFileSync(process.argv[2], "utf-8")

const lines = data.split("\n")
const row = lines.length;
const col = lines[0].length;

const regx = /(?=(XMAS)|(SAMX))/gm;
const combos = ["XMAS", "SAMX"]

function checkHorizontal(linesArr, row, col) {
    const wd = linesArr[row].substr(col, 4);

    if(regx.test(wd)) return 1
    return 0;
}

function checkVertical(linesArr, row, col) {
    if (row + 3 < linesArr.length){
        
        let wd = linesArr[row][col] + 
        linesArr[row + 1][col]+
        linesArr[row + 2][col]+
        linesArr[row + 3][col]

        if (regx.test(wd)) return 1
    }

    return 0;
}

function checkDiagonal(linesArr, row, col){
    let count = 0;
    // right diagonal
    if ((row + 3) < linesArr.length && (col + 3) < linesArr[0].length){
        let ld = linesArr[row][col] + linesArr[row + 1][col + 1] + linesArr[row + 2][col + 2] + linesArr[row + 3][col + 3]
        if(regx.test(ld))
            count += 1;
    }
    
    // left diagonal
    if ((row + 3) < linesArr.length && (col - 3) >= 0){
        let rd = linesArr[row][col] + linesArr[row + 1][col - 1] + linesArr[row + 2][col - 2] + linesArr[row + 3][col - 3]
        
        if(regx.test(rd))
            count += 1;
    }
    
    return count; 
}


let diag = 0, vertical = 0, horizontal = 0;

for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        diag += checkDiagonal(lines, i, j)
        vertical += checkVertical(lines, i, j)
        horizontal += checkHorizontal(lines, i, j)
    }
}

const result = diag + vertical + horizontal;
console.log(result, diag, vertical, horizontal)