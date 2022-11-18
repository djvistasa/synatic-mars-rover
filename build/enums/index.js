"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.Action = exports.Command = void 0;
var Command;
(function (Command) {
    Command["Move"] = "M";
    Command["RotateLeft"] = "L";
    Command["RotateRight"] = "R";
})(Command || (Command = {}));
exports.Command = Command;
var Action;
(function (Action) {
    Action["Add"] = "add";
    Action["Minus"] = "minus";
})(Action || (Action = {}));
exports.Action = Action;
var Direction;
(function (Direction) {
    Direction["North"] = "N";
    Direction["East"] = "E";
    Direction["West"] = "W";
    Direction["South"] = "S";
})(Direction || (Direction = {}));
exports.Direction = Direction;
