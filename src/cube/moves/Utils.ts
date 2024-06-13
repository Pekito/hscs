import { areArraysEqual } from "../../Utils";
import { RubiksCubeLayerMoveGroup, RubiksCubeMove } from "../Types";

export const isMoveFromLayer = (move: RubiksCubeMove, layerMoves: RubiksCubeLayerMoveGroup) => {
    return Object.values(layerMoves).some(layerMove => areArraysEqual(layerMove, move))
}
export const isMoveClockwise = (move: RubiksCubeMove, layer: RubiksCubeLayerMoveGroup) => areArraysEqual(move, layer.CLOCKWISE);
export const isMoveCounterClockwise = (move: RubiksCubeMove, layer: RubiksCubeLayerMoveGroup) => areArraysEqual(move, layer.COUNTER_CLOCKWISE);
export const isMoveDouble = (move: RubiksCubeMove, layer: RubiksCubeLayerMoveGroup) => areArraysEqual(move, layer.DOUBLE);
export const areMovesMirrored = (move1: RubiksCubeMove, move2: RubiksCubeMove): boolean => {
    return move1.every((pos, idx) => move2[pos] === idx);
}