import { createCube, createCubeState } from "../cube/Cube";
import { RubiksCube } from "../cube/Types";
import F2LDB from "../db/states/F2L";
import { F2L_FR_BLOCKED_BL_BR_STATES_TABLE, F2L_FR_BLOCKED_BL_STATES_TABLE, F2L_FR_BLOCKED_BR_STATES_TABLE, F2L_FR_BLOCKED_FL_BL_STATES_TABLE, F2L_FR_BLOCKED_FL_BR_STATES_TABLE, F2L_FR_BLOCKED_FL_STATES_TABLE, F2L_FR_FREE_SLOTS_STATES_TABLE, F2L_FR_NO_FREE_SLOTS_TABLE } from "../db/constants";
import BottomCross from "../db/states/BottomCross";
import { Y_CLOCKWISE_MOVE } from "../cube/moves";
import { printWCACube } from "../visualizers/PrintCube";
import CFOPAnalyzer from "../analyzers/CFOPAnalyzer";

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
const solveF2L = (cube:RubiksCube): RubiksCube => {
    const startingF2LState = createF2LState(cube);
    if(isF2LSolved(startingF2LState)) return cube;
    const solveF2LPair = (cube: RubiksCube): RubiksCube => {
        const f2lState = createF2LState(cube);
        if(isF2LSolved(f2lState)) return cube;
        const table = getUnsolvedF2LTable(f2lState);
        const solution = F2LDB.getSolution(cube, table);
        const f2lRotatedCube = createCubeState([...solution, Y_CLOCKWISE_MOVE], cube)
        return solveF2LPair(f2lRotatedCube);
    }
    return solveF2LPair(cube);
}
const solveCube = (cube: RubiksCube): RubiksCube => {
    const crossSolution = BottomCross.getSolution(cube);
    const crossSolved = createCubeState(crossSolution, cube);
    printWCACube(crossSolved, "Cruz Resolvida")
    const f2lSolved = solveF2L(crossSolved);
    printWCACube(f2lSolved, "F2L resolvido");
    return f2lSolved;
}

export default {
    solveCube,
    getUnsolvedF2LTable,
    createF2LState
}