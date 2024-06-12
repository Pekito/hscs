import { describe, expect, it } from "vitest";
import { createCube, moveCube } from "../../src/cube/Cube";
import { isCubeSolved } from "../../src/analyzers/CommonAnalyzers";
import { R_CLOCKWISE_MOVE } from "../../src/cube/Moves";

describe("isCubeSolved", () => {
    it("Should return true if cube is solved", () => {
        const solvedCube = createCube();
        expect(isCubeSolved(solvedCube)).toEqual(true);
    });
    it("Should return false if cube has been turned", () => {
        const turnedCube = moveCube(createCube(), R_CLOCKWISE_MOVE);
        expect(isCubeSolved(turnedCube)).toEqual(false);
    })
});