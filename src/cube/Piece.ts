import { range, reverseString } from "../Utils";
import { B_LAYER_INDEX, BOTTOM_EDGE_STICKER_INDEX, F_LAYER_INDEX, LEFT_EDGE_STICKER_INDEX, RIGHT_EDGE_STICKER_INDEX, STICKERS_ON_FACE, TOP_EDGE_STICKER_INDEX, Y_AXIS_LAYERS } from "./Constants";
import { createCubeState, getFaceStartIndex } from "./Cube";
import { AXIS_MOVES_ARRAY } from "./moves";
const backTopEdge = getFaceStartIndex(B_LAYER_INDEX) + TOP_EDGE_STICKER_INDEX
const orientedEdgesMap = {
    UB: [1,37],
    UR: [5,28],
    UF: [7,19],
    UL: [3,10],
    FR: [23,30],
    FL: [21,14],
    BL: [41,12],
    BR: [39,32],
    DF: [46,25],
    DR: [50,34],
    DB: [52,43],
    DL: [48,16]
}
const misorientedEdgesMap: Record<string, number[]> = Object.entries(orientedEdgesMap).reduce((accumulator, currentPiece) => {
    accumulator[reverseString(currentPiece[0])] = currentPiece[1].reverse();
    return accumulator;
}, {} as Record<string, number[]>);

export const EdgesMap: Record<string, number[]> = {...orientedEdgesMap, ...misorientedEdgesMap};

export const getPiece = (pieceNotation: string) => EdgesMap[pieceNotation];