import { areArraysEqual } from "../../Utils";
import { NUMBER_OF_STICKERS_ON_CUBE } from "../Constants";
import { createCubeState } from "../Cube";
import { getNotationFromMove, notationToMoveMap } from "../Notation";
import { RubiksCubeLayerMoveGroup, RubiksCubeMove, MoveSequence } from "../Types";
import { X_DOUBLE_MOVE, Y_DOUBLE_MOVE, Z_DOUBLE_MOVE } from "./AxisMoves";
import { LAYER_MOVES } from "./LayerMoves";
export const isMoveFromLayer = (move: RubiksCubeMove, layerMoves: RubiksCubeLayerMoveGroup) => {
    return Object.values(layerMoves).some(layerMove => areArraysEqual(layerMove, move))
}
export const isMoveFromXAxis = (move: RubiksCubeMove) => isMoveFromLayer(move, LAYER_MOVES["R"]) || isMoveFromLayer(move, LAYER_MOVES["L"]);
export const isMoveFromZAxis = (move: RubiksCubeMove) => isMoveFromLayer(move, LAYER_MOVES["F"]) || isMoveFromLayer(move, LAYER_MOVES["B"]);
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
export const mirrorMoveInXAxis = (move: RubiksCubeMove): RubiksCubeMove => {
    if(isMoveFromZAxis(move)) return reverseMove(move);
    const mirroredMove = createCubeState([Y_DOUBLE_MOVE, reverseMove(move), Y_DOUBLE_MOVE]);
    return mirroredMove;
}
export const mirrorMoveInZAxis = (move: RubiksCubeMove): RubiksCubeMove => {
    if(isMoveFromXAxis(move)) return reverseMove(move);
    const mirroredMove = createCubeState([Y_DOUBLE_MOVE, reverseMove(move), Y_DOUBLE_MOVE]);
    return mirroredMove;
}
export const mirrorMoveInZXAxis = (move: RubiksCubeMove) => mirrorMoveInZAxis(mirrorMoveInXAxis(move));

export const reverseSequence = (sequence:  RubiksCubeMove[]) => sequence.map(reverseMove).reverse();
export const mirrorSequenceInZAxis = (sequence: RubiksCubeMove[]) => sequence.map(mirrorMoveInZAxis);

export const mirrorSequenceInXAxis = (sequence: RubiksCubeMove[]) => sequence.map(mirrorMoveInXAxis);
export const mirrorSequenceInZXAxis = (sequence: RubiksCubeMove[]) => sequence.map(mirrorMoveInZXAxis);
export const getAllSequenceMirrors = (sequence: RubiksCubeMove[]) => [sequence, mirrorSequenceInXAxis(sequence), mirrorSequenceInZAxis(sequence), mirrorSequenceInZXAxis(sequence)]
export const getDoubleMove = (move: RubiksCubeMove) => {
    const notation = getNotationFromMove(move);
    if(notation.includes("2")) return move;
    const doubleMoveNotation = notation.replace("'","") + "2";
    return notationToMoveMap[doubleMoveNotation];
}
export const removeRedundantMoves = (sequence: MoveSequence) => sequence.reduce((newSequence, currentMove) => {
    const lastMove = newSequence[newSequence.length - 1];
    if(!lastMove) return [currentMove];
    const lastMoveNotation = getNotationFromMove(lastMove);
    const currentMoveNotation = getNotationFromMove(currentMove);

    if(areMovesMirrored(lastMove, currentMove)) return newSequence.slice(0, -1);
    if(areArraysEqual(lastMove, currentMove)) return [...newSequence.slice(0, -1), getDoubleMove(currentMove)];
    const isDoubleMove =  (notation: string) => notation.includes("2");
    const areMovesFromSameLayer = lastMoveNotation[0] === currentMoveNotation[0];
    if(isDoubleMove(lastMoveNotation) && areMovesFromSameLayer) return [...newSequence.slice(0, -1), reverseMove(currentMove) ]
    return [...newSequence, currentMove];   
}, [] as MoveSequence)

