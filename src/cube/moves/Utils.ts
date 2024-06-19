import { areArraysEqual } from "../../Utils";
import { NUMBER_OF_STICKERS_ON_CUBE } from "../Constants";
import { createCubeState } from "../Cube";
import { getNotationFromMove, notationToMoveMap } from "../Notation";
import { RubiksCubeLayerMoveGroup, RubiksCubeMove } from "../Types";
import { X_DOUBLE_MOVE, Y_DOUBLE_MOVE, Z_DOUBLE_MOVE } from "./AxisMoves";
import { LAYER_MOVES } from "./LayerMoves";

export const isMoveFromLayer = (move: RubiksCubeMove, layerMoves: RubiksCubeLayerMoveGroup) => {
    return Object.values(layerMoves).some(layerMove => areArraysEqual(layerMove, move))
}
export const isMoveClockwise = (move: RubiksCubeMove, layer: RubiksCubeLayerMoveGroup) => areArraysEqual(move, layer.CLOCKWISE);
export const isMoveCounterClockwise = (move: RubiksCubeMove, layer: RubiksCubeLayerMoveGroup) => areArraysEqual(move, layer.COUNTER_CLOCKWISE);
export const isMoveDouble = (move: RubiksCubeMove, layer: RubiksCubeLayerMoveGroup) => areArraysEqual(move, layer.DOUBLE);
export const areMovesMirrored = (move1: RubiksCubeMove, move2: RubiksCubeMove): boolean => {
    return move1.every((pos, idx) => move2[pos] === idx);
}
export const reverseMove = (move: RubiksCubeMove) => {
    const notation = getNotationFromMove(move);
    if(notation.includes("2")) return move;
    if(notation.includes("'")) return notationToMoveMap[notation.replace("'", "")]
    return notationToMoveMap[notation + "'"];
};

export const reverseSequence = (sequence:  RubiksCubeMove[]) => sequence.map(reverseMove).reverse();
export const mirrorMoveHorizontally = (move: RubiksCubeMove): RubiksCubeMove => {
    const mirroredMove = createCubeState([Y_DOUBLE_MOVE, reverseMove(move), Y_DOUBLE_MOVE]);
    return mirroredMove;
}
export const mirrorSequenceHorizontally = (sequence: RubiksCubeMove[]) => sequence.map(mirrorMoveHorizontally);
export const mirrorMoveToBack = (move: RubiksCubeMove): RubiksCubeMove => {
    const mirroredMove = createCubeState([Y_DOUBLE_MOVE, mirrorMoveHorizontally(move), Y_DOUBLE_MOVE]);
    return mirroredMove;
}
export const mirrorSequenceToBack = (sequence: RubiksCubeMove[]) => sequence.map(mirrorMoveToBack);
export const mirrorMoveHorizontallyToBack = (move: RubiksCubeMove) => mirrorMoveToBack(mirrorMoveHorizontally(move));
export const mirrorSequenceHorizontallyToBack = (sequence: RubiksCubeMove[]) => sequence.map(mirrorMoveHorizontallyToBack);
export const getAllSequenceMirrors = (sequence: RubiksCubeMove[]) => [sequence, mirrorSequenceHorizontally(sequence), mirrorSequenceToBack(sequence), mirrorSequenceHorizontallyToBack(sequence)]