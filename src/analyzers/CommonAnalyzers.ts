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