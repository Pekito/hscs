import { areArraysEqual } from "../../Utils";
import { CENTER_INDEXES_ARRAY, NUMBER_OF_STICKERS_ON_CUBE } from "../Constants";
import { getNotationFromMove, notationToMoveMap } from "../Notation";
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
export const mirrorMove = (move: RubiksCubeMove) => {
    const notation = getNotationFromMove(move);
    if(notation.includes("2")) return move;
    if(notation.includes("'")) return notationToMoveMap[notation.replace("'", "")]
    return notationToMoveMap[notation + "'"]
};
export const mirrorSequence = (sequence:  RubiksCubeMove[]) => sequence.map(mirrorMove).reverse();