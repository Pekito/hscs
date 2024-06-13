import { describe, expect, it } from "vitest";
import { createCube, moveCube } from "../../src/cube/Cube";
import { isBottomCrossSolved, isCubeSolved } from "../../src/analyzers/CommonAnalyzers";
import { R_CLOCKWISE_MOVE, Z_CLOCKWISE_MOVE } from "../../src/cube/Moves";
import { applySequence } from "../../src/cube/Notation";
import { RubiksCube } from "../../src/cube/Types";

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

describe("isBottomCrossSolved", () => {
    it("Should return true if cross is solved", () => {
        const solvedCrossCube = applySequence(createCube(), "R U R' U'") as RubiksCube;
        expect(isBottomCrossSolved(solvedCrossCube)).toEqual(true);
    });
    it("Should return false if bottom cross is not solved", () => {
        const solvedCrossCube = applySequence(createCube(), "D2") as RubiksCube;
        expect(isBottomCrossSolved(solvedCrossCube)).toEqual(false);
    }) 
})