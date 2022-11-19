import { Action, Direction } from "../enums";
interface Size {
  x: number;
  y: number;
}

interface Position extends Size {
  direction: Direction;
}

interface AxisAndAction {
  axis: keyof Size;
  action: Action;
}

interface RotateDictionary {
  [key: string]: Direction;
}

interface AxisAndActionDictionary {
  [key: string]: AxisAndAction;
}

export {
  Size,
  Position,
  AxisAndAction,
  RotateDictionary,
  AxisAndActionDictionary,
};
