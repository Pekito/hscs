import { mapMoveArrayToNotation } from "../cube/Notation";
import { RubiksCubeMove, RubiksCube } from "../cube/Types";
import { RubiksCubeMoveNotationSequence } from "./Types";

type stateNodeIndex = number;
const createKey = (moves: RubiksCubeMove[]) => mapMoveArrayToNotation(moves).join("");
const createStateKey = (cube: RubiksCube) => cube.join("");
export const cubeStateGraph = () => {
    const stateNodes: RubiksCube[] = [];
    const stateEdges = new Map<RubiksCubeMoveNotationSequence, stateNodeIndex>();
    const add = (moves: RubiksCubeMove[], cubeState: RubiksCube) => {
        const moveKey = createKey(moves)
        const cubeStateKey = createStateKey(cubeState);
        const cubeStateIndex = stateEdges.get(cubeStateKey);
        if(cubeStateIndex !== undefined) {
            stateEdges.set(moveKey, cubeStateIndex);
            stateEdges.set(cubeStateKey, cubeStateIndex);
            return;
        }
        stateNodes.push(cubeState);
        stateEdges.set(moveKey, stateNodes.length - 1);
        stateEdges.set(cubeStateKey, stateNodes.length - 1);
    }
    const get = (moves: RubiksCubeMove[]): RubiksCube | undefined => {
        return stateNodes[stateEdges.get(createKey(moves)) ?? -1]
    };
    return {
        add,
        get,
        stateNodes,
        stateEdges
    }
}