import { describe, expect, it} from "vitest";
import { createCube } from "../../src/cube/Cube";
import { findOptimalSequence } from "../../src/solvers/Finders";
import { isCubeSolved } from "../../src/analyzers/CommonAnalyzers";
import { R_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE } from "../../src/cube/moves";
import { createCubeState } from "../Utils";
import { getNotationFromMove } from "../../src/cube/Notation";

describe("findOptimalSequence", () => {
    it("Should return 0 moves to cube solved condition", () => {
        const solvedCube = createCube();
        const sequence = findOptimalSequence(solvedCube, isCubeSolved);
        expect(sequence).toEqual([]);
    });
    it("Should return 1 move to cube solved condition", () => {
        const cube = createCubeState([U_CLOCKWISE_MOVE]);
        const sequence = findOptimalSequence(cube, isCubeSolved);
        console.log("Found Sequence!!!", sequence?.map(getNotationFromMove));
        expect(sequence!.length).toEqual(1);
    });
    it.only("Should return 3 move to cube solved condition", () => {
        const cube = createCubeState([R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE]);
        const sequence = findOptimalSequence(cube, isCubeSolved);
        expect(sequence!.length).toEqual(3);
    });
})