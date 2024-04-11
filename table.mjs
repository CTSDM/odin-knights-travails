export default function knightMoves(startPosition, endPosition) {
    const arrQueue = [new Node(startPosition[0], startPosition[1])];

    let index = 0;
    while (true) {
        labelInner: for (let i = 0, m = 0; i < possibleMoves.length; ++i) {
            let nextPosX = arrQueue[index].x + possibleMoves[i][0];
            let nextPosY = arrQueue[index].y + possibleMoves[i][1];
            if (isValidPosition(nextPosX, nextPosY)) {
                // Check if the next position was already visited
                for (let k = 0; k < arrQueue.length; ++k) {
                    if (arrQueue[k].x === nextPosX && arrQueue[k].y === nextPosY) {
                        continue labelInner;
                    }
                }
                arrQueue[index].addChildren(nextPosX, nextPosY, arrQueue[index]);
                arrQueue.push(arrQueue[index].children[m]);
                ++m;
                if (nextPosX === endPosition[0] && nextPosY === endPosition[1]) {
                    printPath(arrQueue[index].children[m - 1]);
                    return;
                }
            }
        }
        ++index;
    }
}

function printPath(node) {
    const arrPath = node.getPath();
    console.log(`You made it in ${arrPath.length - 1} moves! Here's your path:`)
    arrPath.forEach((position) => console.log(position));
}

function isValidPosition(x, y) {
    if (x < BOARD_SIZE && x > -1)
        if (y < BOARD_SIZE && y > -1)
            return true;
    return false;
}

class Node {
    // We also have a parent node to traverse from the final node to the root node.
    constructor(x, y, parent = null) {
        this.x = x;
        this.y = y;
        this.children = [];
        this.parent = parent;
    }

    addChildren(x, y, parent) {
        this.children.push(new Node(x, y, parent));
    }

    getPath(arr = []) {
        if (this.parent === null) {
            arr.push([this.x, this.y]);
            return arr;
        }
        arr.concat(this.parent.getPath(arr));
        arr.push([this.x, this.y]);
        return arr;
    }
}

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
