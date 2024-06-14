import { moveCube } from "../cube/Cube";
import { mapMoveArrayToNotation } from "../cube/Notation";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import { cummulativeIDS, depthSearchParams, iterativeDepthSearch } from "./SearchAlgorithms";
import { CubeCondition, RubiksCubeMoveNotationSequence, RubiksCubeSolution, RubiksCubeStateKey } from "./Types";





export const findOptimalSequence = (params: depthSearchParams) => {
    const solution = iterativeDepthSearch(params);
    return solution;
}