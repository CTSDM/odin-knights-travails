function knightMoves(startPosition, endPosition, arrMoves = []) {
    if (startPosition[0] > 7 || startPosition[0] < 0 || startPosition[1] > 7 || startPosition[1] < 0) {
        return null;
    }
    if (startPosition[0] === endPosition[0] && startPosition[1] === endPosition[1]) {
        return arrMoves.length;
    }
    if (arrMoves.length >= min_length || arrMoves.length > BOARD_SIZE) {
        return null;
    }
    for (let i = 0; i < arrMoves.length; ++i) {
        if (arrMoves[i][0] === startPosition[0] && arrMoves[i][1] === startPosition[1]) {
            return null;
        }
    }
    for (let i = 0; i < possibleMoves.length; ++i) {
        arrMoves.push(startPosition);
        let nextPosition = [startPosition[0] + possibleMoves[i][0], startPosition[1] + possibleMoves[i][1]];
        let newLength = knightMoves(nextPosition, endPosition, arrMoves);
        if (newLength !== null) {
            if (newLength < min_length) {
                min_length = newLength;
            }
        }
        arrMoves.splice(arrMoves.length - 1);
    }
    return min_length;
}

let min_length = Infinity;
const BOARD_SIZE = 8;
const possibleMoves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, 1]
];
