import { isBottomCrossSolved } from "../analyzers/CommonAnalyzers";
import { createCube, createCubeState } from "../cube/Cube";
import { F_CLOCKWISE_MOVE, F_COUNTER_CLOCKWISE_MOVE, getAllSequenceMirrors, LAYER_MOVES_ARRAY, mirrorMoveHorizontally, mirrorMoveToBack, mirrorSequenceHorizontally, mirrorSequenceToBack, R_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE } from "../cube/moves";
import { mapNotationArrayToMove } from "../cube/Notation";
import { RubiksCube } from "../cube/Types";
import { StateHashTableKeyCreator } from "../solvers/DataStructures";
import { findStatesWithOptimalSolution } from "../solvers/Finders";
import { print2DCube, printWCACube } from "../visualizers/PrintCube";
import { getSolvedCubeOrientation, SOLVED_STATES_TABLE } from "./SolvedState";

export const createFrontRightF2LStateKey: StateHashTableKeyCreator = (cube: RubiksCube) => {
    const orientation = getSolvedCubeOrientation(cube);
    const indexes = [23,26].map(index => cube.findIndex((sticker) => sticker === orientation[index]))
    return indexes.join(",");
}
const pescaR = getAllSequenceMirrors([R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE]);
const inserR = getAllSequenceMirrors([R_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE]);
const pescaF = getAllSequenceMirrors([F_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, F_CLOCKWISE_MOVE]);
const inserF = getAllSequenceMirrors([F_COUNTER_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, F_CLOCKWISE_MOVE]);
const FRONT_RIGHT_F2L_STATES = () => findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 5,
    possibleMoves: [...pescaR, ...inserR, ...pescaF, ...inserF],
    stateKeyCreator: createFrontRightF2LStateKey,
});