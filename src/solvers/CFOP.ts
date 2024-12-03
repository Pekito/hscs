import { createCube, createCubeState } from "../cube/Cube";
import { MoveSequence, RubiksCube } from "../cube/Types";
import F2LDB from "../db/states/F2L";
import { F2L_FR_BLOCKED_BL_BR_STATES_TABLE, F2L_FR_BLOCKED_BL_STATES_TABLE, F2L_FR_BLOCKED_BR_STATES_TABLE, F2L_FR_BLOCKED_FL_BL_STATES_TABLE, F2L_FR_BLOCKED_FL_BR_STATES_TABLE, F2L_FR_BLOCKED_FL_STATES_TABLE, F2L_FR_FREE_SLOTS_STATES_TABLE, F2L_FR_NO_FREE_SLOTS_TABLE } from "../db/constants";
import BottomCross from "../db/states/BottomCross";
import { Y_CLOCKWISE_MOVE } from "../cube/moves";
import { printWCACube } from "../visualizers/PrintCube";
import CFOPAnalyzer from "../analyzers/CFOPAnalyzer";
import OLL from "../db/states/OLL";
import PLL from "../db/states/PLL";

type F2LState = {
    flSolved: boolean; 
    frSolved: boolean;
    brSolved: boolean;
    blSolved: boolean;
}
const createF2LState = (cube: RubiksCube): F2LState => {
    return {
        flSolved: CFOPAnalyzer.isF2LPairSolved(cube, "FL") as boolean,
        frSolved: CFOPAnalyzer.isF2LPairSolved(cube, "FR") as boolean,
        brSolved: CFOPAnalyzer.isF2LPairSolved(cube, "BR") as boolean,
        blSolved: CFOPAnalyzer.isF2LPairSolved(cube, "BL") as boolean,
    }
}
const getUnsolvedF2LTable = (f2lState: F2LState): string => {
    const isFreeSlots = Object.values(f2lState).every(isSolved => isSolved === false);
    if(isFreeSlots) return F2L_FR_FREE_SLOTS_STATES_TABLE;
    if(f2lState.blSolved && f2lState.brSolved && f2lState.flSolved) return F2L_FR_NO_FREE_SLOTS_TABLE;
    if(f2lState.blSolved && f2lState.brSolved) return F2L_FR_BLOCKED_BL_BR_STATES_TABLE;
    if(f2lState.flSolved && f2lState.blSolved) return F2L_FR_BLOCKED_FL_BL_STATES_TABLE;
    if(f2lState.flSolved && f2lState.brSolved) return F2L_FR_BLOCKED_FL_BR_STATES_TABLE;
    if(f2lState.flSolved) return F2L_FR_BLOCKED_FL_STATES_TABLE;
    if(f2lState.blSolved) return F2L_FR_BLOCKED_BL_STATES_TABLE;
    if(f2lState.brSolved) return F2L_FR_BLOCKED_BR_STATES_TABLE;
    return "";
}
const isF2LSolved = (f2lState: F2LState) => Object.values(f2lState).every(isSolved => isSolved === true);
const solveF2L = (cube:RubiksCube): MoveSequence => {
    const startingF2LState = createF2LState(cube);
    if(isF2LSolved(startingF2LState)) return [];
    const solveF2LPair = (cube: RubiksCube, solution: MoveSequence = []): MoveSequence => {
        const f2lState = createF2LState(cube);
        if(isF2LSolved(f2lState)) return solution;
        const table = getUnsolvedF2LTable(f2lState);
        const pairSolution = F2LDB.getSolution(cube, table);
        const f2lRotatedCube = createCubeState([...pairSolution, Y_CLOCKWISE_MOVE], cube);
        const currentSolution = [...solution, ...pairSolution, Y_CLOCKWISE_MOVE]
        return solveF2LPair(f2lRotatedCube, currentSolution);
    }
    return solveF2LPair(cube);
}
const solveCube = (cube: RubiksCube): {
    crossSolution: MoveSequence,
    f2lSolution: MoveSequence,
    ollSolution: MoveSequence,
    pllSolution: MoveSequence,
    completeSolution: MoveSequence,
} => {
    const crossSolution = BottomCross.getSolution(cube);
    const crossSolved = createCubeState(crossSolution, cube);
    const f2lSolution = solveF2L(crossSolved);
    const f2lSolvedCube = createCubeState([...crossSolution, ...f2lSolution], cube)
    const ollSolution = OLL.getSolution(f2lSolvedCube);
    const ollSolvedCube = createCubeState(ollSolution, f2lSolvedCube);
    const pllSolution = PLL.getSolution(ollSolvedCube);
    return {
        crossSolution,
        f2lSolution,
        ollSolution,
        pllSolution,
        completeSolution: [
            ...crossSolution,
            ...f2lSolution,
            ...ollSolution,
            ...pllSolution
        ]
    }
}

export default {
    solveCube,
    getUnsolvedF2LTable,
    createF2LState
}