import { BOTTOM_EDGE_STICKER_INDEX, CENTER_FACE_INDEX, D_LAYER_INDEX, EDGES_STICKER_INDEXES, FACE_INDEX_ARRAY, Y_AXIS_LAYERS } from "../cube/Constants";
import { getCenterIndex, getFace } from "../cube/Cube";
import { RubiksCube, RubiksCubeFace } from "../cube/Types";

export const isFaceSolved = (faceIndex: number, cube: RubiksCube): boolean => {
    const face = getFace(faceIndex, cube);
    const center = getCenterIndex(faceIndex, cube);
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
    const isBottomEdgeStickerSolved = (faceIndex: number) => getCenterIndex(faceIndex, cube) + 3 === getFace(faceIndex, cube)[BOTTOM_EDGE_STICKER_INDEX];
    const areBottomEdgesSolved = Y_AXIS_LAYERS.every(isBottomEdgeStickerSolved);
    const areDLayerEdgesSolved = areFaceEdgesSolved(getFace(D_LAYER_INDEX, cube));
    return areBottomEdgesSolved && areDLayerEdgesSolved;
}