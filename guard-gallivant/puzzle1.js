import { readFileSync } from "fs";
const data = readFileSync(process.argv[2], "utf-8");

function getNextDirection(current) {
    switch (current) {
        case "up":
            return "right";
        case "right":
            return "down";
        case "down":
            return "left";
        case "left":
            return "up";
        default:
            return "up";
    }
}

function getNextPosition(map, direction, row, col, obstacle) {
    const directionSteps = {
        up: [-1, 0],
        down: [1, 0],
        left: [0, -1],
        right: [0, 1]
    };

    const [stepRow, stepCol] = directionSteps[direction];
    const nextRow = row + stepRow;
    const nextCol = col + stepCol;

    if (nextRow < 0 || nextRow >= map.length || nextCol < 0 || nextCol >= map[0].length) {
        return { nextDirection: direction, nextPosition: [-1, -1] };
    }

    if (map[nextRow][nextCol] === obstacle) {
        direction = getNextDirection(direction);
        return getNextPosition(map, direction, row, col, obstacle);
    }

    return {
        nextDirection: direction,
        nextPosition: [nextRow, nextCol]
    };
}


function runMap(map, row, col, startDirection, obstacle, visitedPosition) {
    let i = row, j = col;
    let direction = startDirection;
    let cnt = 0;

    while (i >= 0 && j >= 0) {
        if (map[i][j] !== obstacle) {
            if(map[i][j] == "." || map[i][j] == "^") cnt++
            map[i][j] = "X"; 
        }
        const nextPoint = getNextPosition(map, direction, i, j, obstacle);
        direction = nextPoint.nextDirection;
        [i, j] = nextPoint.nextPosition;
    }
    return cnt;
}

function getStartRow(map) {
    const startPos = map.flat().indexOf("^");
    if (startPos === -1) return [-1, -1];

    const row = Math.floor(startPos / map[0].length);
    const col = map[row].indexOf("^");
    return [row, col];
}

const obstacle = "#";
const map = data.trim().split("\n").map(path => path.split(""));
const visitedPosition = new Set();

const [startRow, startCol] = getStartRow(map);
const startDirection = "up";
const finalMap = runMap(map, startRow, startCol, startDirection, obstacle, visitedPosition);
console.log(finalMap);
