import { describe, expect, it } from "vitest";
import { createCube, createCubeState, moveCube } from "../../src/cube/Cube";
import { isBottomCrossSolved, isCubeSolved, isF2LPairSolved } from "../../src/analyzers/CommonAnalyzers";
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

describe("isBottomCrossSolved", () => {
    it("Should return true if cross is solved", () => {
        const solvedCrossCube = applySequence(createCube(), "R U R' U'") as RubiksCube;
        expect(isBottomCrossSolved(solvedCrossCube)).toEqual(true);
    });
    it("Should return false if bottom cross is not solved", () => {
        const solvedCrossCube = applySequence(createCube(), "D2") as RubiksCube;
        expect(isBottomCrossSolved(solvedCrossCube)).toEqual(false);
    }) 
});

describe("isF2LPairSolved", () => {
    it("Should return error if cross is not solved", () => {
        const cube = createCubeState(mapNotationSequenceToMoveSequence("R"));
        const error = isF2LPairSolved(cube, "FR") as Error;
        expect(error.message).toEqual("cross_not_solved");
    });
    it("Should return any pair is solved", () => {
        const cube = createCubeState(mapNotationSequenceToMoveSequence("R U R' L' U' L L U' L' R' U' R"));
        expect(isF2LPairSolved(cube, "BR")).toEqual(false);
        expect(isF2LPairSolved(cube, "BL")).toEqual(false);
        expect(isF2LPairSolved(cube, "FL")).toEqual(false);
        expect(isF2LPairSolved(cube, "FR")).toEqual(false);
    });
    it("Should return every pair is solved but BR", () => {
        const cube = createCubeState(mapNotationSequenceToMoveSequence("R' U2 R"));
        expect(isF2LPairSolved(cube, "BR")).toEqual(false);
        expect(isF2LPairSolved(cube, "BL")).toEqual(true);
        expect(isF2LPairSolved(cube, "FL")).toEqual(true);
        expect(isF2LPairSolved(cube, "FR")).toEqual(true);
    });
    it("Should return every pair is solved but BL", () => {
        const cube = createCubeState(mapNotationSequenceToMoveSequence("L U2 L'"));
        expect(isF2LPairSolved(cube, "BL")).toEqual(false);
        expect(isF2LPairSolved(cube, "BR")).toEqual(true);
        expect(isF2LPairSolved(cube, "FL")).toEqual(true);
        expect(isF2LPairSolved(cube, "FR")).toEqual(true);
    });
    it("Should return every pair is solved but FL", () => {
        const cube = createCubeState(mapNotationSequenceToMoveSequence("L' U2 L"));
        expect(isF2LPairSolved(cube, "FL")).toEqual(false);
        expect(isF2LPairSolved(cube, "BL")).toEqual(true);
        expect(isF2LPairSolved(cube, "BR")).toEqual(true);
        expect(isF2LPairSolved(cube, "FR")).toEqual(true);
    });
    it("Should return every pair is solved but FR", () => {
        const cube = createCubeState(mapNotationSequenceToMoveSequence("R U2 R'"));
        expect(isF2LPairSolved(cube, "FR")).toEqual(false);
        expect(isF2LPairSolved(cube, "FL")).toEqual(true);
        expect(isF2LPairSolved(cube, "BL")).toEqual(true);
        expect(isF2LPairSolved(cube, "BR")).toEqual(true);
    });
})