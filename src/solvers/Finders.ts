import { isBottomCrossSolved } from "../analyzers/CommonAnalyzers";
import { moveCube } from "../cube/Cube";
import { LAYER_MOVES_ARRAY } from "../cube/moves";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import { range } from "../Utils";
import { createCubeStateGraph, CubeStateGraph, StateHashTableKeyCreator, visitedStatesHashTable } from "./DataStructures";
import { DepthSearchSolutionParams, iterativeDepthSearchSolution } from "./SearchAlgorithms";
import { createRubiksCubeMoveSequenceKey, createRubiksCubeStateKey } from "./Utils";

export const findOptimalSequence = (params: DepthSearchSolutionParams) => {
    const solution = iterativeDepthSearchSolution(params);
    return solution;
}

type searchBottomCrossParams = {cube: RubiksCube, possibleMoves?: RubiksCubeMove[], sharedGraph: CubeStateGraph}
export const findOptimalBottomCross = ({cube, possibleMoves = LAYER_MOVES_ARRAY, sharedGraph}: searchBottomCrossParams) => {
    const solution = iterativeDepthSearchSolution({
        condition: isBottomCrossSolved,
        cubeStateNode: cube,
        possibleMoves: possibleMoves,
        depth: 10,
        cubeStateGraph: sharedGraph
    });

    return solution
};

type StateFinder = {
    cubeStateNode: RubiksCube, 
    maxDepth: number, 
    possibleMoves: RubiksCubeMove[],
    stateKeyCreator: StateHashTableKeyCreator 
}
export const findStates = ({
    cubeStateNode: rootCubeState, 
    maxDepth, 
    possibleMoves, 
    stateKeyCreator = createRubiksCubeStateKey
}: StateFinder): RubiksCube[] => {
    const visited = visitedStatesHashTable(stateKeyCreator);
    const stack: { cubeStateNode: RubiksCube, depth: number }[] = [];

    stack.push({ cubeStateNode: rootCubeState, depth: 0 });

    while (stack.length > 0) {
        const { cubeStateNode, depth } = stack.pop()!;
        
        if (depth > maxDepth || visited.hasBeenVisited(cubeStateNode)) continue;
        
        visited.add(cubeStateNode);

        const newStates = possibleMoves
            .map(move => moveCube(cubeStateNode, move))
            .filter(newState => !visited.hasBeenVisited(newState));

        if (depth < maxDepth) {
            newStates.forEach(newState => {
                stack.push({ cubeStateNode: newState, depth: depth + 1 });
            });
        }
    }

    return visited.states;
};
export const findStatesWithOptimalSolution = (params: StateFinder) => {
    const visited = createCubeStateGraph(params.stateKeyCreator);
    const stack: { cubeStateNode: RubiksCube, depth: number, movesToGet: RubiksCubeMove[] }[] = [];

    stack.push({ cubeStateNode: params.cubeStateNode, depth: 0, movesToGet: [] });

    while (stack.length > 0) {
        const { cubeStateNode, depth, movesToGet } = stack.pop()!;

        if (depth > params.maxDepth) continue;

        visited.add(movesToGet, cubeStateNode);

        if (depth < params.maxDepth) {
            params.possibleMoves.forEach(move => {
                const newCube = moveCube(cubeStateNode, move);
                const newMoves = [...movesToGet, move];
                const currentSolution = visited.getSolution(newCube)
                const isNewSolutionBetter = currentSolution ? currentSolution.length > newMoves.length : true;
                if (isNewSolutionBetter) {
                    stack.push({ cubeStateNode: newCube, depth: depth + 1, movesToGet: newMoves });
                }
            });
        }
    }

    const solutions = visited.stateNodes.map((state) => {
        const solution = visited.getSolution(state)!;
        return {
            stateKey: params.stateKeyCreator(state),
            state: state,
            solution: createRubiksCubeMoveSequenceKey(solution),
            depth: solution.length
        }
    });

    return solutions;
}