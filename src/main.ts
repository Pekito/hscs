import { createCubeState } from "./cube/Cube";
import { parseNotationSequenceToMoveSequence } from "./cube/Notation";
import CFOP from "./solvers/CFOP";
import { printWCACube } from "./visualizers/PrintCube";
import { joinMovesBySpaces } from "./visualizers/PrintMove";

const scramble = "U2 R2 U2 R2 B' D2 B R2 B D2 B2 F' U B R' D' R F L' D2 R2";
console.log(`>> Scramble: ${scramble} << \n`)
const scrambledCube = createCubeState(parseNotationSequenceToMoveSequence(scramble));

const solve = CFOP.solveCube(scrambledCube);
const solvedCube = createCubeState(solve.completeSolution, scrambledCube);


printWCACube(solvedCube, "Cubo resolvido 🎉");
console.log("\n");
console.log(`Solução da Cruz: ${joinMovesBySpaces(solve.crossSolution)} \n`);
console.log(`Solução do F2L: ${joinMovesBySpaces(solve.f2lSolution)} \n`);
console.log(`Solução da OLL: ${joinMovesBySpaces(solve.ollSolution)} \n`);
console.log(`Solução da PLL: ${joinMovesBySpaces(solve.pllSolution)}`);