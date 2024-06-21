import { BOTTOM_EDGE_STICKER_INDEX, CENTER_FACE_INDEX, D_LAYER_INDEX, EDGES_STICKER_INDEXES, FACE_INDEX_ARRAY, Y_AXIS_BOTTOM_EDGE_STICKERS, Y_AXIS_LAYERS } from "../cube/Constants";
import { getCenterIndex, getFace } from "../cube/Cube";
import { RubiksCube, RubiksCubeFace } from "../cube/Types";
import { createGetRelativeOrientationIndex, getSolvedCubeOrientation } from "../state-generators/SolvedState";

export const isFaceSolved = (faceIndex: number, cube: RubiksCube): boolean => {
    const face = getFace(faceIndex, cube);
    const center = getCenterIndex(face);
    const isAroundCenter = (index: number) => index <= center + CENTER_FACE_INDEX && index >= center - CENTER_FACE_INDEX;
    return face.every(isAroundCenter);
}

export const isCubeSolved = (cube: RubiksCube) => {
    return FACE_INDEX_ARRAY.every((faceIndex) => isFaceSolved(faceIndex, cube));
}
export const getFaceEdgesIndex = (face: RubiksCubeFace) => EDGES_STICKER_INDEXES.map(edgeIndex => face[edgeIndex]);
export const areFaceEdgesSolved = (face: RubiksCubeFace): boolean => EDGES_STICKER_INDEXES.every(edgeIndex => {
    const isHorizontalSolved = Math.abs(face[CENTER_FACE_INDEX] - face[edgeIndex]) === 1;
    const isVerticalSolved = Math.abs(face[CENTER_FACE_INDEX] - face[edgeIndex]) === 3;
    return isHorizontalSolved || isVerticalSolved;
});
export const isBottomCrossSolved = (cube: RubiksCube) => {
    const orientation = getSolvedCubeOrientation(cube);
    return Y_AXIS_BOTTOM_EDGE_STICKERS.every(bottomEdgeIndex => cube[bottomEdgeIndex] === orientation[bottomEdgeIndex]);
}
type F2LPair = "FL" | "FR" | "BR" | "BL";
export const isF2LPairSolved = (cube: RubiksCube, pair: F2LPair): boolean | Error=> {
    if(!isBottomCrossSolved(cube)) return new Error("cross_not_solved");
    const getRelativeOrientationIndex = createGetRelativeOrientationIndex(cube);
    const f2lPairIndexes: Record<F2LPair, number[]> = {
        FL: [21,24],
        FR: [23,26],
        BR: [39,42],
        BL: [41,44]
    };
    return f2lPairIndexes[pair].every(f2lPairIndex => cube[f2lPairIndex] === getRelativeOrientationIndex(f2lPairIndex));
}