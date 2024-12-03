import { U_LAYER_INDEX } from "../cube/Constants";
import { isIndexFromFace, createCube } from "../cube/Cube";
import { F_CLOCKWISE_MOVE, F_COUNTER_CLOCKWISE_MOVE, reverseSequence, U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, U_DOUBLE_MOVE } from "../cube/moves";
import { SEXY_MOVE, SUNE, ANTISUNE, SLEDGE, JBPerm, UaPerm, UbPerm } from "../cube/moves/Triggers";
import { parseNotationSequenceToMoveSequence } from "../cube/Notation";
import { RubiksCube } from "../cube/Types";
import { StateFinder, findStatesWithOptimalSolution } from "../solvers/Finders";
import { createRubiksCubeMoveSequenceKey } from "../solvers/Utils";
import { print2DCube, printWCACube } from "../visualizers/PrintCube";
import { joinMovesByArrows } from "../visualizers/PrintMove";
import { createGetRelativeOrientationIndex } from "./SolvedState";

export const printPLLKey = (key: any[] | string) => {
    if(typeof key === 'string') key = key.split(",");
    console.log("[------------- PLL Key --------------]")
    console.log("           " + key.slice(0, 3).join(" "));
    console.log("           " + key.slice(3, 6).join(" "));
    console.log("           " + key.slice(6, 9).join(" "));
    console.log("");
    console.log("    " + key.slice(9, 12).join(" ") + "  " + key.slice(12, 15).join(" ") + "  " + key.slice(15, 18).join(" ") + "  " + key.slice(18, 21).join(" "));
    console.log("[------------- PLL Key ---------------]");
}
export const PLLKeyCreator = (cube: RubiksCube) => {
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
    return cubeIndexes.join(",");
}
const BASE_PLLS = [
    UaPerm,
    UbPerm,
    JBPerm,
]

export const PLL_STATES = () => {
    const validMoves = [
        U_CLOCKWISE_MOVE,
        U_COUNTER_CLOCKWISE_MOVE,
        U_DOUBLE_MOVE,
        ...BASE_PLLS
    ]
    const stateFinderParams: StateFinder = {
        cubeStateNode: createCube(),
        maxDepth: 6,
        possibleMoves: validMoves,
        stateKeyCreator: PLLKeyCreator
    }
    return findStatesWithOptimalSolution(stateFinderParams);
}