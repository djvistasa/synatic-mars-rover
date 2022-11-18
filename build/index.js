"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const enums_1 = require("./enums");
const PUT_OF_BOUNDS_ERROR = 'Rover is out of bounds';
function isRoverOutOfBounds(gridSize, roverPosition) {
    const maxX = gridSize.x;
    const minX = -gridSize.x;
    const maxY = gridSize.y;
    const minY = -gridSize.y;
    const isWithinXAxisBounds = roverPosition.x <= maxX && roverPosition.x >= minX;
    const isWithinYAxisBounds = roverPosition.y <= maxY && roverPosition.y >= minY;
    return isWithinXAxisBounds && isWithinYAxisBounds;
}
function rotateRight(direction) {
    switch (direction) {
        case enums_1.Direction.North:
            return enums_1.Direction.East;
        case enums_1.Direction.East:
            return enums_1.Direction.South;
        case enums_1.Direction.South:
            return enums_1.Direction.West;
        case enums_1.Direction.West:
            return enums_1.Direction.North;
        default:
            return enums_1.Direction.North;
    }
}
function rotateLeft(direction) {
    switch (direction) {
        case enums_1.Direction.North:
            return enums_1.Direction.West;
        case enums_1.Direction.West:
            return enums_1.Direction.South;
        case enums_1.Direction.South:
            return enums_1.Direction.East;
        case enums_1.Direction.East:
            return enums_1.Direction.North;
        default:
            return enums_1.Direction.North;
    }
}
function getAxisAndActionByDirection(direction) {
    switch (direction) {
        case enums_1.Direction.North:
            return {
                axis: 'y',
                action: enums_1.Action.Add,
            };
        case enums_1.Direction.South:
            return {
                axis: 'y',
                action: enums_1.Action.Minus,
            };
        case enums_1.Direction.West:
            return {
                axis: 'x',
                action: enums_1.Action.Minus,
            };
        case enums_1.Direction.East:
            return {
                axis: 'x',
                action: enums_1.Action.Add,
            };
        default:
            return {
                axis: 'x',
                action: enums_1.Action.Add,
            };
    }
}
function getCoordinateAfterMove(action, coordinate) {
    if (action === enums_1.Action.Minus) {
        return coordinate - 1;
    }
    return coordinate + 1;
}
function moveForward(direction, position) {
    const { axis, action } = getAxisAndActionByDirection(direction);
    position[axis] = getCoordinateAfterMove(action, position[axis]);
    return Object.assign({}, position);
}
function translateCommandAndExecute(currentPosition, command) {
    const currentDirection = currentPosition.direction;
    switch (command) {
        case enums_1.Command.RotateLeft:
            return Object.assign(Object.assign({}, currentPosition), { direction: rotateLeft(currentDirection) });
        case enums_1.Command.RotateRight:
            return Object.assign(Object.assign({}, currentPosition), { direction: rotateRight(currentDirection) });
        case enums_1.Command.Move:
            return moveForward(currentDirection, currentPosition);
        default:
            return { x: 0, y: 0, direction: enums_1.Direction.North };
    }
}
function driveRover(startingPoint, listOfCommands, gridSize) {
    let currentPosition = startingPoint;
    for (let index = 0; index < listOfCommands.length; index++) {
        const command = listOfCommands[index];
        const nextMoveCoords = translateCommandAndExecute(currentPosition, command);
        const isRoverStillInBoundsAFterMOve = isRoverOutOfBounds(gridSize, nextMoveCoords);
        if (!isRoverStillInBoundsAFterMOve) {
            console.log(PUT_OF_BOUNDS_ERROR);
            break;
        }
        currentPosition = nextMoveCoords;
    }
    console.log(currentPosition);
}
function startRover(gridSize, startingPoint, commands = '') {
    const listOfCommands = commands.split('');
    const roverHasBeenPlottedAndIsInBounds = isRoverOutOfBounds(gridSize, startingPoint);
    if (!roverHasBeenPlottedAndIsInBounds) {
        return console.log(PUT_OF_BOUNDS_ERROR);
    }
    driveRover(startingPoint, listOfCommands, gridSize);
}
function initializeMission() {
    const missionFile = (0, node_fs_1.readFileSync)('./src/inputs/index.txt', {
        encoding: 'utf8',
    });
    const missionInfo = missionFile.split('\n');
    const gridSize = missionInfo[0];
    const startingPoint = missionInfo[1];
    const command = missionInfo[2];
    const gridCoords = gridSize.split(' ');
    const gridX = Number(gridCoords[0]);
    const gridY = Number(gridCoords[1]);
    const startingCoordsAndDirection = startingPoint.split(' ');
    const startingX = Number(startingCoordsAndDirection[0]);
    const startingY = Number(startingCoordsAndDirection[1]);
    const direction = startingCoordsAndDirection[2];
    startRover({ x: gridX, y: gridY }, { x: startingX, y: startingY, direction: direction }, command);
}
initializeMission();
