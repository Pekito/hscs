import { moveCube } from "../cube/Cube";
import { areMovesMirrored, isMoveClockwise, isMoveCounterClockwise, isMoveDouble, isMoveFromLayer, LAYER_MOVES, LAYER_MOVES_ARRAY } from "../cube/moves";
import { getNotationFromMove } from "../cube/Notation";
import { getRandomLayer, getRandomMove } from "../cube/Random";
import { RubiksCube, RubiksCubeMove } from "../cube/Types";

type cubeCondition = (cube: RubiksCube) => boolean;
const cubeMoveStateMemo = () => {
    const memo = new Map<string, RubiksCube>();
    const createKey = (move: RubiksCubeMove, cube:RubiksCube) => cube.join("") + "|" + move.join("");
    const get = (move: RubiksCubeMove, cube: RubiksCube) => memo.get(createKey(cube, move));
    const set = (move: RubiksCubeMove, cube:RubiksCube) => memo.set(createKey(cube, move), cube);
    return {
        get,
        set
    }
}
export const findOptimalSequence = (
    cube: RubiksCube, 
    condition: cubeCondition, 
    moves: RubiksCubeMove[] = []): RubiksCubeMove[] | undefined => {
        
    if(condition(cube)) return moves;
    const breadthSearchResult = (cube: RubiksCube, movesToSearch: RubiksCubeMove[] = LAYER_MOVES_ARRAY, solutionMoves: RubiksCubeMove[] = moves) => {
        if(condition(cube)) return solutionMoves;
        const nextMove = movesToSearch[0];
        if(nextMove === undefined) {
            console.log("did not found solution", solutionMoves.map(getNotationFromMove));
            return undefined;
        }
        const lastMove = solutionMoves[solutionMoves.length - 1];

        if(!lastMove) return breadthSearchResult(moveCube(cube, nextMove), movesToSearch.slice(1), [...solutionMoves, nextMove]);
        const isNextMoveRedundant = areMovesMirrored(lastMove, nextMove);
        if(isNextMoveRedundant) return breadthSearchResult(cube, movesToSearch.slice(1), solutionMoves);

        return breadthSearchResult(moveCube(cube, nextMove), movesToSearch.slice(1), [...solutionMoves, nextMove]);

    }
    const solutions = LAYER_MOVES_ARRAY.map((_, index) => {
        const movesToSearch = [...LAYER_MOVES_ARRAY.slice(0, index), ...LAYER_MOVES_ARRAY.slice(index + 1)];
        return breadthSearchResult(cube, movesToSearch);
    })
    const foundSolutions = solutions.filter(solution => solution !== undefined);
    if(foundSolutions.length === 0) return undefined;
    const bestSolution = foundSolutions.reduce((previousSolution, currentSolution) => previousSolution.length < currentSolution.length ? previousSolution : currentSolution);
    return bestSolution;
}