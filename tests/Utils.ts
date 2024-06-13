import { moveCube, createCube } from "../src/cube/Cube";
import { RubiksCube, RubiksCubeMove } from "../src/cube/Types";

const moveReducer = (cube: RubiksCube, move: RubiksCubeMove) => moveCube(cube, move);
export const createCubeState = (moves: RubiksCubeMove[]): RubiksCube => moves.reduce(moveReducer, createCube());