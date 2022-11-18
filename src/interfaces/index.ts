import { Action, Direction } from '../enums';
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

export { Size, Position, AxisAndAction };
