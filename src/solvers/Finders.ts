import { createCubeState, moveCube } from "../cube/Cube";
import { removeRedundantMoves, reverseSequence } from "../cube/moves";
import { getNotationFromMove } from "../cube/Notation";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import database from "../db/database";
import { createCubeStateGraph, CubeStateGraph, StateHashTableKeyCreator, visitedStatesHashTable } from "./DataStructures";
import { DepthSearchSolutionParams, iterativeDepthSearchSolution } from "./SearchAlgorithms";
import { createRubiksCubeMoveSequenceKey, createRubiksCubeStateKey } from "./Utils";

export const findOptimalSequence = (params: DepthSearchSolutionParams) => {
    const solution = iterativeDepthSearchSolution(params);
    return solution;
}

type StateFinder = {
    cubeStateNode: RubiksCube, 
    maxDepth: number, 
    possibleMoves: Array<RubiksCubeMove | RubiksCubeMove[]>,
    stateKeyCreator: StateHashTableKeyCreator,
}
export const findStatesWithOptimalSolution = (params: StateFinder) => {

    const visited = createCubeStateGraph(params.stateKeyCreator);
    const stack: { cubeStateNode: RubiksCube, depth: number, movesToGet: RubiksCubeMove[] }[] = [];

    stack.push({ cubeStateNode: params.cubeStateNode, depth: 0, movesToGet: [] });
    while (stack.length > 0) {
        const { cubeStateNode, depth, movesToGet } = stack.pop()!;
        if (depth > params.maxDepth) continue;

        visited.add(reverseSequence(movesToGet), cubeStateNode);

        if (depth < params.maxDepth) {
            params.possibleMoves.forEach(move => {
                const moves = (Array.isArray(move[0]) ? move : [move]) as RubiksCubeMove[];
                const newCube = createCubeState(moves, cubeStateNode);
                const newMoves = [...movesToGet, ...moves];
                const currentSolution = visited.getSolution(newCube)
                const isNewSolutionBetter = currentSolution ? currentSolution.length > newMoves.length : true;
                if (isNewSolutionBetter) {
                    stack.push({ cubeStateNode: newCube, depth: depth + 1, movesToGet: newMoves });
                }
            });
        }
    }

    const solutions = visited.stateNodes
        .map((state) => {
            const solution = visited.getSolution(state)!;
            const optimizedSolution = removeRedundantMoves(solution);
            return {
                stateKey: params.stateKeyCreator(state),
                state: state,
                solution: createRubiksCubeMoveSequenceKey(optimizedSolution),
                depth: optimizedSolution.length
            }
        });

    return solutions;
}