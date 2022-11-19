import { Action, Command, Direction } from "../enums";
import {
  AxisAndAction,
  RotateDictionary,
  AxisAndActionDictionary,
} from "../interfaces";

const rotateRightDictionary: RotateDictionary = {
  [Direction.North]: Direction.East,
  [Direction.East]: Direction.South,
  [Direction.South]: Direction.West,
  [Direction.West]: Direction.North,
};

const rotateLeftDictionary: RotateDictionary = {
  [Direction.North]: Direction.West,
  [Direction.West]: Direction.South,
  [Direction.South]: Direction.East,
  [Direction.East]: Direction.North,
};

const axisAndDirectionDictionary: AxisAndActionDictionary = {
  [Direction.North]: {
    axis: "y",
    action: Action.Add,
  },
  [Direction.South]: {
    axis: "y",
    action: Action.Minus,
  },
  [Direction.West]: {
    axis: "x",
    action: Action.Minus,
  },
  [Direction.East]: {
    axis: "x",
    action: Action.Add,
  },
};

export {
  rotateRightDictionary,
  rotateLeftDictionary,
  axisAndDirectionDictionary,
};
