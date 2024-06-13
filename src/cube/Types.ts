export type UnidimensionalCube<T> = ReadonlyArray<T>
export type UnidimensionalFace<T> = ReadonlyArray<T>
export type RubiksCube = UnidimensionalCube<number>;
export type RubiksCubeFace = UnidimensionalFace<number>;
export type ColoredRubiksCube = UnidimensionalCube<string>;
export type RubiksCubeFaceNotation = "U" | "L" | "F" | "R" | "B" | "D";
export type RubiksCubeMove = UnidimensionalCube<number>;
export type RubiksCubeLayerMoveGroup = {
    CLOCKWISE: RubiksCubeMove
    COUNTER_CLOCKWISE: RubiksCubeMove
    DOUBLE: RubiksCubeMove
}