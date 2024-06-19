import { moveCube, createCube } from "../src/cube/Cube";
import { RubiksCube, RubiksCubeMove } from "../src/cube/Types";
import { printWCACube } from "../src/visualizers/PrintCube";

const moveReducer = (cube: RubiksCube, move: RubiksCubeMove) => moveCube(cube, move);
export const createCubeState = (moves: RubiksCubeMove[], cube: RubiksCube = createCube()): RubiksCube => moves.reduce(moveReducer, cube);