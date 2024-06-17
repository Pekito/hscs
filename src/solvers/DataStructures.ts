import { mapMoveArrayToNotation } from "../cube/Notation";
import { RubiksCubeMove, RubiksCube } from "../cube/Types";
import { RubiksCubeMoveNotationSequence, RubiksCubeStateKey } from "./Types";
import { createRubiksCubeMoveSequenceKey, createRubiksCubeStateKey } from "./Utils";

type stateNodeIndex = number;
export type CubeStateGraph = {
    add: (moves: RubiksCubeMove[], cubeState: RubiksCube) => void,
    get: (moves: RubiksCubeMove[]) => RubiksCube | undefined,
    stateNodes: RubiksCube[],
    stateEdges: Map<RubiksCubeMoveNotationSequence, stateNodeIndex>,
    statePositionEdges: Map<RubiksCubeStateKey, stateNodeIndex>,
    getSolution: (state: RubiksCube) => RubiksCubeMove[] | undefined,
    stateSolutionEdges: Map<RubiksCubeStateKey, RubiksCubeMove[]>
}
export const createCubeStateGraph = (): CubeStateGraph => {
    const stateNodes: RubiksCube[] = [];
    const stateEdges = new Map<RubiksCubeMoveNotationSequence, stateNodeIndex>();
    const statePositionEdges = new Map<RubiksCubeStateKey, stateNodeIndex>();
    const stateSolutionEdges = new Map<RubiksCubeStateKey, RubiksCubeMove[]>();
    const add = (moves: RubiksCubeMove[], cubeState: RubiksCube) => {
        const moveKey = createRubiksCubeMoveSequenceKey(moves)
        const cubeStateKey = createRubiksCubeStateKey(cubeState);
        const cubeStateIndex = statePositionEdges.get(cubeStateKey);
        stateSolutionEdges.set(cubeStateKey, moves);
        if(cubeStateIndex !== undefined) {
            stateEdges.set(moveKey, cubeStateIndex);
            statePositionEdges.set(cubeStateKey, cubeStateIndex);
            return;
        }
        stateNodes.push(cubeState);
        stateEdges.set(moveKey, stateNodes.length - 1);
        statePositionEdges.set(cubeStateKey, stateNodes.length - 1);
        
    }
    const getSolution = (state: RubiksCube) => {
        return stateSolutionEdges.get(createRubiksCubeStateKey(state));
    }
    const get = (moves: RubiksCubeMove[]): RubiksCube | undefined => {
        return stateNodes[stateEdges.get(createRubiksCubeMoveSequenceKey(moves)) ?? -1]
    };
    return {
        add,
        get,
        getSolution,
        stateNodes,
        stateEdges,
        statePositionEdges,
        stateSolutionEdges
    }
}

export type StateHashTableKeyCreator = (cube: RubiksCube) => string;
export const visitedStatesHashTable = (keyCreator: StateHashTableKeyCreator) => {
    const stateNodes: RubiksCube[] = [];
    const stateEdges = new Map<RubiksCubeStateKey, stateNodeIndex>();
    const add = (cubeState: RubiksCube) => {
        const cubeStateKey = keyCreator(cubeState);
        const cubeStateIndex = stateEdges.get(cubeStateKey);
        if(cubeStateIndex !== undefined) {
            stateEdges.set(cubeStateKey, cubeStateIndex);
            return;
        }
        stateNodes.push(cubeState);
        stateEdges.set(cubeStateKey, stateNodes.length - 1);
    }
    const get = (cubeState: RubiksCube): RubiksCube | undefined => {
        const key = keyCreator(cubeState);
        return stateNodes[stateEdges.get(key) ?? -1];
    };
    const hasBeenVisited = (cubeState: RubiksCube) => get(cubeState) !== undefined;
    return {
        add,
        get,
        hasBeenVisited,
        states: stateNodes
    }
}