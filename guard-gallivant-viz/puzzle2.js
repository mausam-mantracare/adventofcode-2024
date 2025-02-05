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

function getValidPosition(map, initialPos, startDirection, obstacle) {
    const visitedPosition = new Set();
    let i = row, j = col;
    let direction = startDirection;

    while (i >= 0 && j >= 0) {
        const nextPoint = getNextPosition(map, direction, i, j, obstacle);
        direction = nextPoint.nextDirection;
        [i, j] = nextPoint.nextPosition;

        if (i >= 0 && j >= 0) visitedPosition.add(nextPoint.nextPosition.toString())
    }
    return visitedPosition;
}