import { moveCube } from "../cube/Cube";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import { range } from "../Utils";
import { CubeCondition, RubiksCubeSolution } from "./Types";

export type DepthSearchSolutionParams = {
    condition: CubeCondition,
    cubeStateNode: RubiksCube,
    depth: number,
    possibleMoves: RubiksCubeMove[]
}
export const iterativeDepthSearchSolution = ({
    condition, cubeStateNode, depth: maxDepth, possibleMoves
}: DepthSearchSolutionParams): RubiksCubeSolution | undefined => {
    if(condition(cubeStateNode)) return [];
    for(const currentMaxDepth of range(maxDepth)) {
        const result = depthSearchSolution({
            condition,
            depth: currentMaxDepth,
            cubeStateNode,
            possibleMoves
        });
        if(result !== undefined) return result;
    }
    return undefined;
}

export const depthSearchSolution = ({
    condition, cubeStateNode, depth, possibleMoves
}: DepthSearchSolutionParams): RubiksCubeSolution | undefined => {
    if(depth === 0) {
        if(condition(cubeStateNode)) return [];
        else return undefined;
    }
    for(const move of possibleMoves) {
        const child = moveCube(cubeStateNode, move);
        const result = depthSearchSolution({
            cubeStateNode: child,
            condition,
            depth: depth - 1,
            possibleMoves
        });
        if(result) return [move, ...result]
    }
    return undefined;
}