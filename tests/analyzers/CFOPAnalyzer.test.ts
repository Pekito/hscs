import { describe, expect, it } from "vitest";
import { createCube, createCubeState } from "../../src/cube/Cube";
import { applySequence, parseNotationSequenceToMoveSequence } from "../../src/cube/Notation";
import { RubiksCube } from "../../src/cube/Types";
import CFOPAnalyzer from "../../src/analyzers/CFOPAnalyzer";
describe("isBottomCrossSolved", () => {
    it("Should return true if cross is solved", () => {
        const solvedCrossCube = applySequence(createCube(), "R U R' U'") as RubiksCube;
        expect(CFOPAnalyzer.isBottomCrossSolved(solvedCrossCube)).toEqual(true);
    });
    it("Should return false if bottom cross is not solved", () => {
        const solvedCrossCube = applySequence(createCube(), "D2") as RubiksCube;
        expect(CFOPAnalyzer.isBottomCrossSolved(solvedCrossCube)).toEqual(false);
    }) 
});
describe("isF2LPairSolved", () => {
    it("Should return error if cross is not solved", () => {
        const cube = createCubeState(parseNotationSequenceToMoveSequence("R"));
        const error = CFOPAnalyzer.isF2LPairSolved(cube, "FR") as Error;
        expect(error.message).toEqual("cross_not_solved");
    });
    it("Should return any pair is solved", () => {
        const cube = createCubeState(parseNotationSequenceToMoveSequence("R U R' L' U' L L U' L' R' U' R"));
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BR")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BL")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FL")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FR")).toEqual(false);
    });
    it("Should return every pair is solved but BR", () => {
        const cube = createCubeState(parseNotationSequenceToMoveSequence("R' U2 R"));
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BR")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BL")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FL")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FR")).toEqual(true);
    });
    it("Should return every pair is solved but BL", () => {
        const cube = createCubeState(parseNotationSequenceToMoveSequence("L U2 L'"));
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BL")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BR")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FL")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FR")).toEqual(true);
    });
    it("Should return every pair is solved but FL", () => {
        const cube = createCubeState(parseNotationSequenceToMoveSequence("L' U2 L"));
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FL")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BL")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BR")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FR")).toEqual(true);
    });
    it("Should return every pair is solved but FR", () => {
        const cube = createCubeState(parseNotationSequenceToMoveSequence("R U2 R'"));
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FR")).toEqual(false);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "FL")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BL")).toEqual(true);
        expect(CFOPAnalyzer.isF2LPairSolved(cube, "BR")).toEqual(true);
    });
})