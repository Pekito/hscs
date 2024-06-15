import { isBottomCrossSolved } from "../analyzers/CommonAnalyzers";
import { BOTTOM_EDGE_STICKER_INDEX, Y_AXIS_BOTTOM_EDGE_STICKERS } from "../cube/Constants";
import { createCube, getFaces, getYAxisFaces, moveCube } from "../cube/Cube";
import { LAYER_MOVES_ARRAY } from "../cube/moves";
import { getNotationFromMove } from "../cube/Notation";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import { removeArrayDuplicates } from "../Utils";
import { printWCACube, wcaCube } from "../visualizers/PrintCube";
import { cubeStateGraph, StateHashTableKeyCreator, visitedStatesHashTable } from "./DataStructures";
import { DepthSearchSolutionParams, iterativeDepthSearchSolution } from "./SearchAlgorithms";
import { createRubiksCubeStateKey, parseCubeStateKey } from "./Utils";





export const findOptimalSequence = (params: DepthSearchSolutionParams) => {
    const solution = iterativeDepthSearchSolution(params);
    return solution;
}

type searchBottomCrossParams = {cube: RubiksCube, possibleMoves?: RubiksCubeMove[]}
export const findOptimalBottomCross = ({cube, possibleMoves = LAYER_MOVES_ARRAY}: searchBottomCrossParams) => iterativeDepthSearchSolution({
    condition: isBottomCrossSolved,
    cubeStateNode: cube,
    possibleMoves: possibleMoves,
    depth: 10,
});

type stateFinder = {
    cubeStateNode: RubiksCube, 
    maxDepth: number, 
    possibleMoves: RubiksCubeMove[],
    hashTableKeyCreator: StateHashTableKeyCreator 
}
export const findStates = ({
    cubeStateNode: rootCubeState, 
    maxDepth, 
    possibleMoves, 
    hashTableKeyCreator = createRubiksCubeStateKey
}: stateFinder): RubiksCube[] => {
    const visited = visitedStatesHashTable(hashTableKeyCreator);
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