import { F_LAYER_INDEX, U_LAYER_INDEX } from "../cube/Constants";
import { createCube, getCenterIndex, getFace } from "../cube/Cube";
import { AXIS_MOVES_ARRAY } from "../cube/moves";
import { RubiksCube } from "../cube/Types";
import { findStatesWithOptimalSolution } from "../solvers/Finders";

export const createSolvedStateKey = (cube: RubiksCube) => {
    const uFaceIndex = getCenterIndex(getFace(U_LAYER_INDEX,cube));
    const fFaceIndex = getCenterIndex(getFace(F_LAYER_INDEX,cube));
    return `${uFaceIndex},${fFaceIndex}`
}
export const SOLVED_STATES = findStatesWithOptimalSolution({
    cubeStateNode: createCube(),
    maxDepth: 2,
    possibleMoves: AXIS_MOVES_ARRAY,
    stateKeyCreator: createSolvedStateKey
});
export const SOLVED_STATES_TABLE = SOLVED_STATES.reduce((obj, currentValue) => {
    obj[currentValue.stateKey] = currentValue.state;
    return obj;
}, {} as Record<string, RubiksCube>)
export const getSolvedCubeOrientation = (cube: RubiksCube) => SOLVED_STATES_TABLE[createSolvedStateKey(cube)];