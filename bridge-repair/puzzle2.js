import {readFileSync} from "fs"

const data = readFileSync(process.argv[2], "utf-8")

const lines = data.split("\n").map(x => x.split(":"))

// console.log(lines)

function checkCalibration(input, target, index, result){
    if(index == input.length){
        if(result == target) return true
        return false
    }
    // index++;
    
    return checkCalibration(input, target, index+1, result + input[index]) ||
    checkCalibration(input, target, index+1, result * input[index]) || 
    checkCalibration(input, target, index+1, Number(result.toString() + input[index].toString()))
}

let total_calibration = 0;

for (const index in lines){

    const target= Number(lines[index][0])

    const input = lines[index][1].trim().split(" ").map(Number)
    
    const correct = checkCalibration(input, target, 1, input[0])

    if(correct) total_calibration += target;
}

console.log(total_calibration)
