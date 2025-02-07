import { readFileSync } from "fs"

const data = readFileSync(process.argv[2], "utf-8")
const lines = data.split("\n").map(ln => ln.split(""))

function getInputString(lines) {

    const result = new Map()
    lines.forEach((line, i) => {
        line.forEach((el, j) => {
            if (el != ".") {
                if (!result.has(el)) result.set(el, [])
                result.get(el).push({ row: i, col: j })
            }
        })
    })

    return result;
}
function getDifference(nodeA, nodeB) {
    return [nodeA.row - nodeB.row, nodeA.col - nodeB.col]
}


function calculateAntinodes(node, diffX, diffY, antennas, char, result) {
    const isCorrect = (x, y) => x >= 0 && y >= 0 && y < antennas[0].length && x < antennas.length && antennas[x][y] != char;

    const [x, y] = [node.row + diffX, node.col + diffY]
    if (isCorrect(x, y)) result.add([x, y].toString())

    const [x1, y1] = [node.row - diffX, node.col - diffY]
    if (isCorrect(x1, y1)) result.add([x1, y1].toString())
}




function calculateAllAntinodes(node, diffX, diffY, antennas, result) {

    let [x, y] = [node.row + diffX, node.col + diffY];
    // const row = antennas.length, col = antennas[0].length;
    const isCorrect = (x, y) => x >= 0 && y >= 0 && y < antennas[0].length && x < antennas.length;

    console.log(isCorrect(x, y), [x, y])

    while (true) {
        if (isCorrect(x,y)) {
            result.add([x, y].toString())
            [x, y] = [x + diffX, y + diffY];
        } else {
            break;
        }
    }

    [x, y] = [node.row - diffX, node.col - diffY];
    while (true) {
        if(isCorrect(x, y)){
            result.add([x, y].toString())
            [x, y] = [x - diffX, y - diffY];
        }else{
            break
        }
    }
}

const antinodes = new Set()

function getAntinodes(input) {
    input.forEach((points, antenna) => {
        const totalPoints = points.length;
        for (let i = 0; i < totalPoints; i++) {
            for (let j = i + 1; j < totalPoints; j++) {
                const [diffX, diffY] = getDifference(points[i], points[j])
                calculateAllAntinodes(points[i], diffX, diffY, lines, antinodes)
                calculateAllAntinodes(points[j], diffX, diffY, lines, antinodes)
            }
        }
    })
}

const input = getInputString(lines);
getAntinodes(input)

console.log(antinodes, antinodes.size)