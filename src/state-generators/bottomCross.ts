import { Y_AXIS_BOTTOM_EDGE_STICKERS } from "../cube/Constants";
import { createCube } from "../cube/Cube";
import { LAYER_MOVES_ARRAY } from "../cube/moves";
import { RubiksCube } from "../cube/Types";
import { StateHashTableKeyCreator } from "../solvers/DataStructures";
import { findStates } from "../solvers/Finders";
export const createBottomCrossStateKey: StateHashTableKeyCreator = (cube: RubiksCube) => {
    const keyIndexes = Y_AXIS_BOTTOM_EDGE_STICKERS.map(index => cube.findIndex((sticker) => sticker === index));
    return keyIndexes.join(",");
}
export const findBottomCrossStates = () => {
    let result = findStates(
        {cubeStateNode: createCube(), possibleMoves: LAYER_MOVES_ARRAY, hashTableKeyCreator: createBottomCrossStateKey, maxDepth: 999999999999999})
    return result;
}