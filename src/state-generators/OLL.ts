import { reverse } from "dns";
import CFOPAnalyzer from "../analyzers/CFOPAnalyzer";
import { U_LAYER_INDEX } from "../cube/Constants";
import { createCube, createCubeState, getFace, isIndexFromFace } from "../cube/Cube";
import { F_CLOCKWISE_MOVE, F_COUNTER_CLOCKWISE_MOVE, reverseSequence, U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, U_DOUBLE_MOVE, Z_DOUBLE_MOVE } from "../cube/moves";
import { ANTISUNE, HEDGE, INSERCAO, MEIA_LUA, PESCA, SEXY_MOVE, SLEDGE, SUNE } from "../cube/moves/Triggers";
import { mapNotationSequenceToMoveSequence } from "../cube/Notation";
import { RubiksCube } from "../cube/Types";
import { findStatesWithOptimalSolution, StateFinder } from "../solvers/Finders";
import { getIndexColor, print2DCube, printWCACube } from "../visualizers/PrintCube";
import { joinMovesBySpaces } from "../visualizers/PrintMove";
import { createGetRelativeOrientationIndex, getSolvedCubeOrientation } from "./SolvedState";
import { Console } from "console";
import { createRubiksCubeMoveSequenceKey } from "../solvers/Utils";
export const printOLLKey = (key: any[] | string) => {
    if(typeof key === 'string') key = key.split(",");
    console.log("[------------- OLL Key --------------]")
    console.log("           " + key.slice(0, 3).join(" "));
    console.log("           " + key.slice(3, 6).join(" "));
    console.log("           " + key.slice(6, 9).join(" "));
    console.log("");
    console.log("    " + key.slice(9, 12).join(" ") + "  " + key.slice(12, 15).join(" ") + "  " + key.slice(15, 18).join(" ") + "  " + key.slice(18, 21).join(" "));
    console.log("[------------- OLL Key ---------------]");
}
export const OLLKeyCreator = (cube: RubiksCube) => {
    const getRelativeIndex = createGetRelativeOrientationIndex(cube);
    const targetIndexes = [
        0,1,2,
        3,4,5,
        6,7,8,

        9,10,11, // L Face

        18,19,20,// F Face

        27,28,29,// R Face

        36,37,38, // B Face
    ]
    const relativeTargetIndexes = targetIndexes.map(topFaceIndex => {
        const relativeIndex = getRelativeIndex(topFaceIndex);
        return relativeIndex;
    });
    const cubeIndexes = relativeTargetIndexes.map(relativeTargetIndex => cube[relativeTargetIndex]);
    const uFaceColors = cubeIndexes.map(idx => {
        const color = isIndexFromFace(idx, U_LAYER_INDEX) ? "0" : "-";
        return color;
    });
    return uFaceColors.join(",");
}
const BASE_OLLS = [
    [F_CLOCKWISE_MOVE, ...SEXY_MOVE, F_COUNTER_CLOCKWISE_MOVE],
    SUNE,
    ANTISUNE,
    [...SEXY_MOVE, ...SLEDGE],
    reverseSequence([...SEXY_MOVE, ...SLEDGE]),
    mapNotationSequenceToMoveSequence("R U2 R2 F R F' R U2 R'")

]
export const OLL_STATES = () => {
    const validMoves = [
        U_CLOCKWISE_MOVE,
        U_COUNTER_CLOCKWISE_MOVE,
        U_DOUBLE_MOVE,
        ...BASE_OLLS
    ]
    const stateFinderParams: StateFinder = {
        cubeStateNode: createCube(),
        maxDepth: 6,
        possibleMoves: validMoves,
        stateKeyCreator: OLLKeyCreator
    }
    const optimalStateSolutions = findStatesWithOptimalSolution(stateFinderParams).map(optimalStateSolution => ({
        ...optimalStateSolution,
        solution: createRubiksCubeMoveSequenceKey(optimalStateSolution.solutionMoves),
        solutionMoves: optimalStateSolution.solutionMoves
    }));
    return optimalStateSolutions;
}