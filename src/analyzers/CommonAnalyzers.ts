import { UNCHANGED_MOVE } from "../cube/Moves";
import { RubiksCube } from "../cube/Types";

export const isCubeSolved = (cube: RubiksCube) => {
    return cube.every((sticker, index) => sticker === UNCHANGED_MOVE[index]);
}