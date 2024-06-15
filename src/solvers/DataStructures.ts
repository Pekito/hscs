import { mapMoveArrayToNotation } from "../cube/Notation";
import { RubiksCubeMove, RubiksCube } from "../cube/Types";
import { RubiksCubeMoveNotationSequence, RubiksCubeStateKey } from "./Types";
import { createRubiksCubeMoveSequenceKey, createRubiksCubeStateKey } from "./Utils";

type stateNodeIndex = number;

export const cubeStateGraph = () => {
    const stateNodes: RubiksCube[] = [];
    const stateEdges = new Map<RubiksCubeMoveNotationSequence, stateNodeIndex>();
    const statePositionEdges = new Map<RubiksCubeStateKey, stateNodeIndex>();
    const add = (moves: RubiksCubeMove[], cubeState: RubiksCube) => {
        const moveKey = createRubiksCubeMoveSequenceKey(moves)
        const cubeStateKey = createRubiksCubeStateKey(cubeState);
        const cubeStateIndex = statePositionEdges.get(cubeStateKey);
        if(cubeStateIndex !== undefined) {
            stateEdges.set(moveKey, cubeStateIndex);
            statePositionEdges.set(cubeStateKey, cubeStateIndex);
            return;
        }
        stateNodes.push(cubeState);
        stateEdges.set(moveKey, stateNodes.length - 1);
        statePositionEdges.set(cubeStateKey, stateNodes.length - 1);
    }
    const get = (moves: RubiksCubeMove[]): RubiksCube | undefined => {
        return stateNodes[stateEdges.get(createRubiksCubeMoveSequenceKey(moves)) ?? -1]
    };
    return {
        add,
        get,
        stateNodes,
        stateEdges,
        statePositionEdges
    }
}

export const visitedStatesHashTable = () => {
    const stateNodes: RubiksCube[] = [];
    const stateEdges = new Map<RubiksCubeStateKey, stateNodeIndex>();
    const add = (cubeState: RubiksCube) => {
        const cubeStateKey = createRubiksCubeStateKey(cubeState);
        const cubeStateIndex = stateEdges.get(cubeStateKey);
        if(cubeStateIndex !== undefined) {
            stateEdges.set(cubeStateKey, cubeStateIndex);
            return;
        }
        stateNodes.push(cubeState);
        stateEdges.set(cubeStateKey, stateNodes.length - 1);
    }
    const get = (cubeState: RubiksCube): RubiksCube | undefined => {
        const key = createRubiksCubeStateKey(cubeState);
        return stateNodes[stateEdges.get(key) ?? -1];
    };
    const hasBeenVisited = (cubeState: RubiksCube) => get(cubeState) !== undefined;
    return {
        add,
        get,
        hasBeenVisited,
    }
}