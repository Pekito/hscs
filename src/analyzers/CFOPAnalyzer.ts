import { Y_AXIS_BOTTOM_EDGE_STICKERS } from "../cube/Constants";
import { RubiksCube } from "../cube/Types";
import { getSolvedCubeOrientation, createGetRelativeOrientationIndex } from "../state-generators/SolvedState";

const isBottomCrossSolved = (cube: RubiksCube) => {
    const orientation = getSolvedCubeOrientation(cube);
    return Y_AXIS_BOTTOM_EDGE_STICKERS.every(bottomEdgeIndex => cube[bottomEdgeIndex] === orientation[bottomEdgeIndex]);
}
type F2LPair = "FL" | "FR" | "BR" | "BL";
const f2lPairIndexes: Record<F2LPair, number[]> = {
    FL: [21,24],
    FR: [23,26],
    BR: [39,42],
    BL: [41,44]
};
const isF2LPairSolved = (cube: RubiksCube, pair: F2LPair): boolean | Error=> {
    if(!isBottomCrossSolved(cube)) return new Error("cross_not_solved");
    const getRelativeOrientationIndex = createGetRelativeOrientationIndex(cube);

    return f2lPairIndexes[pair].every(f2lPairIndex => cube[f2lPairIndex] === getRelativeOrientationIndex(f2lPairIndex));
}
const isF2LSolved = (cube:RubiksCube) => Object.keys(f2lPairIndexes).every(f2lPairKey=> isF2LPairSolved(cube, f2lPairKey as F2LPair));

export default {
    isBottomCrossSolved,
    isF2LPairSolved,
    isF2LSolved
}