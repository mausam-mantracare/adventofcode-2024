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

function getStartRow(map) {
    const startPos = map.flat().indexOf("^");
    if (startPos === -1) return [-1, -1];

    const row = Math.floor(startPos / map[0].length);
    const col = map[row].indexOf("^");
    return [row, col];
}

function getValidPosition(map, initialPos, startDirection, obstacle) {
    const visitedPosition = new Set();
    let i = initialPos.row, j = initialPos.col;
    let direction = startDirection;

    while (i >= 0 && j >= 0) {
        const nextPoint = getNextPosition(map, direction, i, j, obstacle);
        direction = nextPoint.nextDirection;
        [i, j] = nextPoint.nextPosition;

        if (i >= 0 && j >= 0) visitedPosition.add(nextPoint.nextPosition.toString())
    }
    return visitedPosition;
}


// function foundLoop(map, startDirection, initialPos, obstacle){
//     let currentLoop = new Map();
//     let i = initialPos.row, j = initialPos.col;
//     let direction = startDirection;

//     while(i >=0 && j>=0){

        
//         const nextPoint = getNextPosition(map, direction, i, j, obstacle);
//         direction = nextPoint.nextDirection;
//         [i, j] = nextPoint.nextPosition;
        
//         if(currentLoop.has([i, j].toString()) && (direction == currentLoop.get([i,j].toString())))
//             return true;
        
//         if (i >= 0 && j >= 0) currentLoop.set([i, j].toString(), direction)
//     }

//     return false;
// }

function getGuardLoops(map, visitedPosition, initialPos, direction, obstacle){
    let count = 0;

    for(const pos of visitedPosition){
    
        const [tRow, tCol] = pos.split(",");
        map[tRow][tCol] = "#"
        // console.log("new obstacle pos: ", [tRow, tCol])
        if(foundLoop(map, direction, initialPos, obstacle)){
            // console.log("Found --")
            count++
        }

        map[tRow][tCol] = "."
        
    }

    return count;
}

// const initialPos = {
//     row: startRow,
//     col: startCol
// }
// const result2 = getGuardLoops(map, visitedPosition, initialPos, startDirection, obstacle)