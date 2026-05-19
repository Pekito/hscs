export type UnidimensionalCube<T> = ReadonlyArray<T>
export type UnidimensionalFace<T> = ReadonlyArray<T>
export type RubiksCube = Uint8Array;
export type RubiksCubeFace = Uint8Array;
export type ColoredRubiksCube = UnidimensionalCube<string>;
export type RubiksCubeMove = UnidimensionalCube<number>;
export type MoveSequence = RubiksCubeMove[];
export type RubiksCubeLayerMoveGroup = {
    CLOCKWISE: RubiksCubeMove
    COUNTER_CLOCKWISE: RubiksCubeMove
    DOUBLE: RubiksCubeMove
}