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
            return null;
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
    }

    return {
        nextDirection: direction,
        nextPosition: [row + directionSteps[direction][0], col + directionSteps[direction][1]]
    };
}


function runMap(map, row, col, startDirection, obstacle) {
    let i = row, j = col;
    let direction = startDirection;
    let cnt = 0;

    while (i != -1 && j != -1) {
        const nextPoint = getNextPosition(map, direction, i, j, obstacle);
        if (nextPoint.nextPosition[0] === -1) break;

        // print(nextPoint, cnt);

        direction = nextPoint.nextDirection;
        [i, j] = nextPoint.nextPosition;

        if (map[i] && map[i][j] !== obstacle) {
            map[i][j] = "X"; 
        }

        cnt++;
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
