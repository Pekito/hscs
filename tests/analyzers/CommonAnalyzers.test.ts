import { describe, expect, it } from "vitest";
import { createCube, createCubeState, moveCube } from "../../src/cube/Cube";
import { isCubeSolved} from "../../src/analyzers/CommonAnalyzers";
import { applySequence, mapNotationSequenceToMoveSequence } from "../../src/cube/Notation";
import { RubiksCube } from "../../src/cube/Types";
import { Z_CLOCKWISE_MOVE, R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE } from "../../src/cube/moves";

describe("isCubeSolved", () => {
    it("Should return true if cube is solved", () => {
        const solvedCube = createCube();
        expect(isCubeSolved(solvedCube)).toEqual(true);
    });
    it("Should return true if cube is rotated but solved", () => {
        const rotatedSolvedCube = moveCube(createCube(), Z_CLOCKWISE_MOVE);
        expect(isCubeSolved(rotatedSolvedCube)).toEqual(true);
    });
    it("Should return false if cube has been turned", () => {
        const turnedCube = moveCube(createCube(), R_CLOCKWISE_MOVE);
        expect(isCubeSolved(turnedCube)).toEqual(false);
    });
});