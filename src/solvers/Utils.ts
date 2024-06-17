import { mapMoveArrayToNotation } from "../cube/Notation";
import { RubiksCubeMove, RubiksCube } from "../cube/Types";
import { RubiksCubeStateKey } from "./Types";

export const createRubiksCubeMoveSequenceKey = (moves: RubiksCubeMove[]) => mapMoveArrayToNotation(moves).join(" ");
export const createRubiksCubeStateKey = (cube: RubiksCube): RubiksCubeStateKey => cube.join("");
export const parseCubeStateKey = (key: RubiksCubeStateKey): RubiksCube => key.split("").map((_) => parseInt(_));