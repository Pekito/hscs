import { moveCube } from "../cube/Cube";
import { getNotationFromMove, mapMoveArrayToNotation } from "../cube/Notation";
import { MoveSequence, RubiksCube, RubiksCubeMove } from "../cube/Types";
import { range } from "../Utils";
import { printWCACube } from "../visualizers/PrintCube";
import { createCubeStateGraph, CubeStateGraph, Stack } from "./DataStructures";
import { CubeCondition, RubiksCubeSolution } from "./Types";

export type DepthSearchSolutionParams = {
    condition: CubeCondition,
    cubeStateNode: RubiksCube,
    depth: number,
    possibleMoves: RubiksCubeMove[],
    cubeStateGraph?: CubeStateGraph
}
export const iterativeDepthFirstSearchSolution = ({
    condition, cubeStateNode, depth: maxDepth, possibleMoves, cubeStateGraph: cubeStateGraph = createCubeStateGraph() 
}: DepthSearchSolutionParams): RubiksCubeSolution | undefined => {
    if(condition(cubeStateNode)) return [];
    for(const currentMaxDepth of range(maxDepth)) {
        const result = depthFirstSearchSolution({
            condition,
            depth: currentMaxDepth,
            cubeStateNode,
            possibleMoves
        });
        if(result !== undefined) return result;
    }
    return undefined;
}

export const depthFirstSearchSolution = ({
    condition, cubeStateNode, depth: maxDepth, possibleMoves, cubeStateGraph: cubeStateGraph = createCubeStateGraph() 
}: DepthSearchSolutionParams): RubiksCubeSolution | undefined => {
    type DepthSearchStackItem = {
        state: RubiksCube,
        depth: number,
        sequenceToGet: MoveSequence
    };
    const stack = Stack<DepthSearchStackItem>();
    stack.push({
        state: cubeStateNode,
        depth: 0,
        sequenceToGet: []
    })
    while(!stack.isEmpty()) {
        const {
            state: currentState, 
            depth: currentDepth, 
            sequenceToGet: currentSequenceToGet
        } = stack.pop();
        if(condition(currentState)) { return currentSequenceToGet }
        for(const move of possibleMoves) {
            const newState = moveCube(currentState, move);
            const newDepth = currentDepth + 1;
            if(newDepth > maxDepth) continue;
            stack.push({
                state: newState,
                depth: newDepth,
                sequenceToGet: [...currentSequenceToGet, move]
            });
        }
    }
    return undefined;
}