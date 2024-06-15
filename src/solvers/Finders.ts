import { isBottomCrossSolved } from "../analyzers/CommonAnalyzers";
import { moveCube } from "../cube/Cube";
import { LAYER_MOVES_ARRAY } from "../cube/moves";
import { getNotationFromMove } from "../cube/Notation";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import { removeArrayDuplicates } from "../Utils";
import { printWCACube, wcaCube } from "../visualizers/PrintCube";
import { cubeStateGraph, visitedStatesHashTable } from "./DataStructures";
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


export const findStates = ({
    cubeStateNode, depth: maxDepth, possibleMoves
}: DepthSearchSolutionParams)=> {
    const visited = visitedStatesHashTable();

    const generateNewStates = (cubeStateNode: RubiksCube, possibleMoves: RubiksCubeMove[]) => {
        return possibleMoves.map(move => {
            const newState = moveCube(cubeStateNode, move);

            return newState;
        })
    }
    const accumulateStates = (cubeStateNode: RubiksCube, depth: number, possibleMoves: RubiksCubeMove[]): RubiksCube[] => {
        if (depth === 0) {
            if(visited.hasBeenVisited(cubeStateNode)) return []
            visited.add(cubeStateNode);
            return [cubeStateNode];
        }
        return generateNewStates(cubeStateNode, possibleMoves)
            .flatMap(newState => {
                const states = accumulateStates(newState, depth - 1, possibleMoves)
                return states
            });
    }
    
    const foundStates = Array.from({ length: maxDepth + 1 }, (_, currentDepth) =>
        accumulateStates(cubeStateNode, currentDepth, possibleMoves)
    ).flat();

    return foundStates;
}
