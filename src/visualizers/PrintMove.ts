import { mapMoveArrayToNotation } from "../cube/Notation";
import { RubiksCubeMove } from "../cube/Types";

export const joinMovesBySpaces = (moves: RubiksCubeMove[]) => mapMoveArrayToNotation(moves).join(" ");
export const joinMovesByArrows = (moves: RubiksCubeMove[]) => mapMoveArrayToNotation(moves).join(" -> ");