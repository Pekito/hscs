import { moveCube } from "../cube/Cube";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";
import { range } from "../Utils";
import { CubeCondition, RubiksCubeSolution } from "./Types";

export type depthSearchParams = {
    condition: CubeCondition,
    cubeStateNode: RubiksCube,
    depth: number,
    possibleMoves: RubiksCubeMove[]
}
export const iterativeDepthSearch = ({
    condition, cubeStateNode, depth: maxDepth, possibleMoves
}: depthSearchParams): RubiksCubeSolution | undefined => {
    if(condition(cubeStateNode)) return [];
    for(const currentMaxDepth of range(maxDepth)) {
        const result = depthSearch({
            condition,
            depth: currentMaxDepth,
            cubeStateNode,
            possibleMoves
        });
        if(result !== undefined) return result;
    }
    return undefined;
}

export const depthSearch = ({
    condition, cubeStateNode, depth, possibleMoves
}: depthSearchParams): RubiksCubeSolution | undefined => {
    if(depth === 0) {
        if(condition(cubeStateNode)) return [];
        else return undefined;
    }
    for(const move of possibleMoves) {
        const child = moveCube(cubeStateNode, move);
        const result = depthSearch({
            cubeStateNode: child,
            condition,
            depth: depth - 1,
            possibleMoves
        });
        if(result) return [...result, move]
    }
    return undefined;
}