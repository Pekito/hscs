import { B_LAYER_INDEX, D_LAYER_INDEX, F_LAYER_INDEX, L_LAYER_INDEX, R_LAYER_INDEX, U_LAYER_INDEX } from "./Constants";
import { moveCube } from "./Cube";
import { R_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, F_CLOCKWISE_MOVE, F_COUNTER_CLOCKWISE_MOVE, L_CLOCKWISE_MOVE, L_COUNTER_CLOCKWISE_MOVE, B_CLOCKWISE_MOVE, B_COUNTER_CLOCKWISE_MOVE, D_CLOCKWISE_MOVE, D_COUNTER_CLOCKWISE_MOVE, U_DOUBLE_MOVE, B_DOUBLE_MOVE, D_DOUBLE_MOVE, F_DOUBLE_MOVE, L_DOUBLE_MOVE, R_DOUBLE_MOVE, X_CLOCKWISE_MOVE, X_COUNTER_CLOCKWISE_MOVE, X_DOUBLE_MOVE, Y_CLOCKWISE_MOVE, Y_COUNTER_CLOCKWISE_MOVE, Y_DOUBLE_MOVE, Z_CLOCKWISE_MOVE, Z_COUNTER_CLOCKWISE_MOVE, Z_DOUBLE_MOVE } from "./Moves";
import { RubiksCube, RubiksCubeMove } from "./Types";
export const notationToLayerIndexMap: Record<string, number> = Object.freeze({
    "U": U_LAYER_INDEX,
    "L": L_LAYER_INDEX,
    "F": F_LAYER_INDEX,
    "R": R_LAYER_INDEX,
    "B": B_LAYER_INDEX,
    "D": D_LAYER_INDEX
});

const notationToMoveMap: Record<string, RubiksCubeMove> = Object.freeze({
    "U": U_CLOCKWISE_MOVE,
    "U'": U_COUNTER_CLOCKWISE_MOVE,
    "U2": U_DOUBLE_MOVE,
    "L": L_CLOCKWISE_MOVE,
    "L'": L_COUNTER_CLOCKWISE_MOVE,
    "L2": L_DOUBLE_MOVE,
    "F": F_CLOCKWISE_MOVE,
    "F'": F_COUNTER_CLOCKWISE_MOVE,
    "F2": F_DOUBLE_MOVE,
    "R": R_CLOCKWISE_MOVE,
    "R'": R_COUNTER_CLOCKWISE_MOVE,
    "R2": R_DOUBLE_MOVE,
    "B": B_CLOCKWISE_MOVE,
    "B'": B_COUNTER_CLOCKWISE_MOVE,
    "B2": B_DOUBLE_MOVE,
    "D": D_CLOCKWISE_MOVE,
    "D'": D_COUNTER_CLOCKWISE_MOVE,
    "D2": D_DOUBLE_MOVE,
    "x": X_CLOCKWISE_MOVE,
    "x'": X_COUNTER_CLOCKWISE_MOVE,
    "x2": X_DOUBLE_MOVE,
    "y": Y_CLOCKWISE_MOVE,
    "y'": Y_COUNTER_CLOCKWISE_MOVE,
    "y2": Y_DOUBLE_MOVE,
    "z": Z_CLOCKWISE_MOVE,
    "z'": Z_COUNTER_CLOCKWISE_MOVE,
    "z2": Z_DOUBLE_MOVE
});
const isValidNotationMove = (input: string) => notationToMoveMap[input] !== undefined;
export const applySequence = (cube: RubiksCube, sequence: string): RubiksCube | Error => {
    const clearedSequence = sequence.trim().split(" ");
    const isValidSequence = clearedSequence.every(isValidNotationMove);
    if(!isValidSequence) return new Error(`Invalid Sequence ${sequence}`);
    const applyMove = (cube: RubiksCube, move: string) => {
        return moveCube(cube, notationToMoveMap[move]);
    };
    const result = clearedSequence.reduce(applyMove, cube);
    return result;
}

