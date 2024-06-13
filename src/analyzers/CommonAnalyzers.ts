import { CENTER_FACE_INDEX, FACE_INDEX_ARRAY } from "../cube/Constants";
import { getCenterIndex, getFace } from "../cube/Cube";
import { RubiksCube } from "../cube/Types";

export const isFaceSolved = (faceIndex: number, cube: RubiksCube): boolean => {
    const face = getFace(faceIndex, cube);
    const center = getCenterIndex(faceIndex, cube);
    const isAroundCenter = (index: number) => index <= center + CENTER_FACE_INDEX && index >= center - CENTER_FACE_INDEX;
    return face.every(isAroundCenter);
}

export const isCubeSolved = (cube: RubiksCube) => {
    return FACE_INDEX_ARRAY.every((faceIndex) => isFaceSolved(faceIndex, cube));
}