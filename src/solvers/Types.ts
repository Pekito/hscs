import { MoveSequence, RubiksCube, RubiksCubeMove } from "../cube/Types";

export type RubiksCubeStateKey = string;
export type RubiksCubeMoveNotationSequence = string;
export type RubiksCubeSolution = MoveSequence;
export type CubeCondition = (cube: RubiksCube) => boolean;
