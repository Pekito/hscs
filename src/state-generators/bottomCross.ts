import { Y_AXIS_BOTTOM_EDGE_STICKERS } from "../cube/Constants";
import { createCube } from "../cube/Cube";
import { LAYER_MOVES_ARRAY } from "../cube/moves";
import { RubiksCube } from "../cube/Types";
import { createWriteSolutionLine, loadStateHashTable, StateHashTable } from "../db/utils";
import { createCubeStateGraph, StateHashTableKeyCreator } from "../solvers/DataStructures";
import { findOptimalBottomCross, findStates } from "../solvers/Finders";
import { createRubiksCubeMoveSequenceKey } from "../solvers/Utils";
export const createBottomCrossStateKey: StateHashTableKeyCreator = (cube: RubiksCube) => {
    const keyIndexes = Y_AXIS_BOTTOM_EDGE_STICKERS.map(index => cube.findIndex((sticker) => sticker === index));
    return keyIndexes.join(",");
}
export const findBottomCrossStates = () => {
    let result = findStates(
        {cubeStateNode: createCube(), possibleMoves: LAYER_MOVES_ARRAY, hashTableKeyCreator: createBottomCrossStateKey, maxDepth: 999999999999999})
    return result;
}
export const solveBottomCrossStateCases = async (stateHashTable: StateHashTable) => {
    const graph = createCubeStateGraph();
    const writeBottomCrossSolutionLine = createWriteSolutionLine("bottom-cross");
    for(const [stateKey, state] of Object.entries(stateHashTable)) {
            const solution = findOptimalBottomCross({
                cube: state,
                sharedGraph: graph,
            });
            if(solution) {
                const key = createRubiksCubeMoveSequenceKey(solution);
                console.log(`Solução para o caso ${stateKey} com os movimentos > ${key} < encontrada!`);
                await writeBottomCrossSolutionLine({
                    [stateKey]: createRubiksCubeMoveSequenceKey(solution)
                });
            }
    }
}