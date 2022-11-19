import { readFileSync } from "node:fs";
import { Position, Size, AxisAndAction } from "./interfaces";
import { Command, Action, Direction } from "./enums";
import { rotateLeftDictionary, rotateRightDictionary } from "./utils";

const PUT_OF_BOUNDS_ERROR = "Rover is out of bounds";

function isRoverOutOfBounds(gridSize: Size, roverPosition: Position): boolean {
  const maxX = gridSize.x;
  const minX = -gridSize.x;
  const maxY = gridSize.y;
  const minY = -gridSize.y;

  const isWithinXAxisBounds =
    roverPosition.x <= maxX && roverPosition.x >= minX;
  const isWithinYAxisBounds =
    roverPosition.y <= maxY && roverPosition.y >= minY;

  return isWithinXAxisBounds && isWithinYAxisBounds;
}

function getAxisAndActionByDirection(direction: Direction): AxisAndAction {
  switch (direction) {
    case Direction.North:
      return {
        axis: "y",
        action: Action.Add,
      };
    case Direction.South:
      return {
        axis: "y",
        action: Action.Minus,
      };
    case Direction.West:
      return {
        axis: "x",
        action: Action.Minus,
      };
    case Direction.East:
      return {
        axis: "x",
        action: Action.Add,
      };

    default:
      return {
        axis: "x",
        action: Action.Add,
      };
  }
}

function getCoordinateAfterMove(action: Action, coordinate: number) {
  if (action === Action.Minus) {
    return coordinate - 1;
  }

  return coordinate + 1;
}

function moveForward(direction: Direction, position: Position): Position {
  const { axis, action } = getAxisAndActionByDirection(direction);

  position[axis] = getCoordinateAfterMove(action, position[axis]);

  return { ...position };
}

function translateCommandAndExecute(
  currentPosition: Position,
  command: string
): Position {
  const currentDirection = currentPosition.direction;

  switch (command) {
    case Command.RotateLeft:
      return {
        ...currentPosition,
        direction: rotateLeftDictionary[currentDirection],
      };

    case Command.RotateRight:
      return {
        ...currentPosition,
        direction: rotateRightDictionary[currentDirection],
      };
    case Command.Move:
      return moveForward(currentDirection, currentPosition);

    default:
      return { x: 0, y: 0, direction: Direction.North };
  }
}

function driveRover(
  startingPoint: Position,
  listOfCommands: string[],
  gridSize: Size
) {
  let currentPosition = startingPoint;

  for (let index = 0; index < listOfCommands.length; index++) {
    const command = listOfCommands[index];

    const nextMoveCoords = translateCommandAndExecute(currentPosition, command);

    const isRoverStillInBoundsAFterMOve = isRoverOutOfBounds(
      gridSize,
      nextMoveCoords
    );

    if (!isRoverStillInBoundsAFterMOve) {
      console.log(PUT_OF_BOUNDS_ERROR);

      break;
    }

    currentPosition = nextMoveCoords;
  }

  console.log(currentPosition);
}

function startRover(
  gridSize: Size,
  startingPoint: Position,
  commands: string = ""
) {
  const listOfCommands: string[] = commands.split("");

  const roverHasBeenPlottedAndIsInBounds = isRoverOutOfBounds(
    gridSize,
    startingPoint
  );

  if (!roverHasBeenPlottedAndIsInBounds) {
    return console.log(PUT_OF_BOUNDS_ERROR);
  }

  driveRover(startingPoint, listOfCommands, gridSize);
}

function initializeMission() {
  const missionFile = readFileSync("./src/inputs/index.txt", {
    encoding: "utf8",
  });
  const missionInfo = missionFile.split("\n");

  const gridSize = missionInfo[0];
  const startingPoint = missionInfo[1];
  const command = missionInfo[2];

  const gridCoords = gridSize.split(" ");

  const gridX = Number(gridCoords[0]);
  const gridY = Number(gridCoords[1]);

  const startingCoordsAndDirection = startingPoint.split(" ");
  const startingX = Number(startingCoordsAndDirection[0]);
  const startingY = Number(startingCoordsAndDirection[1]);
  const direction = startingCoordsAndDirection[2] as Direction;

  startRover(
    { x: gridX, y: gridY },
    { x: startingX, y: startingY, direction: direction },
    command
  );
}

initializeMission();
