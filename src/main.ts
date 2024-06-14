import { createCubeState } from "../tests/Utils";
import { isCubeSolved } from "./analyzers/CommonAnalyzers";
import { moveCube, createCube } from "./cube/Cube";
import { LAYER_MOVES, LAYER_MOVES_ARRAY, QUARTER_TURN_LAYER_MOVES_ARRAY, R_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, U_DOUBLE_MOVE } from "./cube/moves";
import { applySequence, getNotationFromMove } from "./cube/Notation";
import { WCA_COLOR_SCHEME } from "./cube/Schemes";
import { RubiksCube, RubiksCubeMove } from "./cube/Types";
import { cubeStateGraph } from "./solvers/CubeStateGraph";
import { iterativeDepthSearch } from "./solvers/SearchAlgorithms";
import { areArraysEqual } from "./Utils";
import { getColoredCube, print2DCube, printWCACube } from "./visualizers/PrintCube";
import { getMovesWithArrows } from "./visualizers/PrintMove";
// const moveReducer = (cube: RubiksCube, move: RubiksCubeMove) => moveCube(cube, move);
// const createCubeState = (moves: RubiksCubeMove[]) => moves.reduce(moveReducer, createCube());
// const zCube = createCubeState([R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE]);

// const coloredCube = getColoredCube(WCA_COLOR_SCHEME, zCube);
// print2DCube(coloredCube);
// console.log(zCube);

const cube = createCubeState([R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE]);
const result = iterativeDepthSearch({
    condition: isCubeSolved,
    cubeStateNode: cube,
    possibleMoves: LAYER_MOVES_ARRAY,
    depth: 3
});

console.log(getMovesWithArrows(result!));