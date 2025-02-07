const fs = require("node:fs")

const data = fs.readFileSync(process.argv[2], "utf-8")
const lines = data.split("\n").map(ln => ln.split(""))

function getInputString(lines){

    const result = new Map()
    lines.forEach((line, i) => {
        line.forEach((el, j) => {
            if(el != "."){
                if(!result.has(el)) result.set(el, [])
                result.get(el).push({row: i, col: j})
            }
        })
    })

    return result;
}
function getDifference(nodeA, nodeB){
    return [nodeA.row - nodeB.row, nodeA.col - nodeB.col]
}


function calculateAntinodes(node, diffX, diffY, antennas, char, result){
    
    const isCorrect = (x,y) => x >= 0 && y >= 0 && y < antennas[0].length && x < antennas.length && antennas[x][y] != char;    

    const [x, y] = [node.row + diffX, node.col + diffY]
    if(isCorrect(x,y)) result.add([x,y].toString())

    const [x1, y1] = [node.row - diffX, node.col - diffY]
    if(isCorrect(x1,y1)) result.add([x1,y1].toString())
}

const antinodes = new Set()

function getAntinodes(input){
    input.forEach((points, antenna) => {
        const totalPoints = points.length;
        for(let i =0; i < totalPoints; i++){
            for(let j = i+1; j < totalPoints; j++){
                const [diffX, diffY] = getDifference(points[i], points[j])
                calculateAntinodes(points[i], diffX, diffY, lines, antenna, antinodes)
                calculateAntinodes(points[j], diffX, diffY, lines, antenna, antinodes)
            }
        }
    })
}

const input = getInputString(lines);
getAntinodes(input)

console.log(antinodes, antinodes.size)

// const fake = JSON.parse(JSON.stringify(lines))

// antinodes.forEach(point => {
//     fake[point[0]][point[1]] = fake[point[0]][point[1]] == "." ? "#" : fake[point[0]][point[1]];
// })

// console.log(fake.map(x => x.join("")).join("\n"))