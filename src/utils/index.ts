import { Direction } from "../enums";

const rotateRightDictionary = {
  [Direction.North]: Direction.East,
  [Direction.East]: Direction.South,
  [Direction.South]: Direction.West,
  [Direction.West]: Direction.North,
};

const rotateLeftDictionary = {
  [Direction.North]: Direction.West,
  [Direction.West]: Direction.South,
  [Direction.South]: Direction.East,
  [Direction.East]: Direction.North,
};

export { rotateRightDictionary, rotateLeftDictionary };
