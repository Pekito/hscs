import { Y_AXIS_BOTTOM_EDGE_STICKERS } from "../cube/Constants";
import { createCube } from "../cube/Cube";
import { LAYER_MOVES_ARRAY } from "../cube/moves";
import { RubiksCube } from "../cube/Types";
import { createWriteSolutionLine, loadStateHashTable, StateHashTable } from "../db/utils";
import { createCubeStateGraph, StateHashTableKeyCreator } from "../solvers/DataStructures";
import { findStatesWithOptimalSolution } from "../solvers/Finders";
import { createRubiksCubeMoveSequenceKey } from "../solvers/Utils";
import { SOLVED_STATES_TABLE, createSolvedStateKey } from "./SolvedState";

export const createBottomCrossStateKey: StateHashTableKeyCreator = (cube: RubiksCube) => {
    const orientation = SOLVED_STATES_TABLE[createSolvedStateKey(cube)];
    const keyIndexes = Y_AXIS_BOTTOM_EDGE_STICKERS.map(index => cube.findIndex((sticker) => sticker === orientation[index]));
    return keyIndexes.join(",");
}
export const findEveryBottomCrossState = () => findStatesWithOptimalSolution({
    cubeStateNode: createCube(), 
    maxDepth: 8, // According to https://www.cubezone.be/crossstudy.html the maximum depth of cross states using Face Turn Metric is 8
    possibleMoves: LAYER_MOVES_ARRAY, 
    stateKeyCreator: createBottomCrossStateKey
})