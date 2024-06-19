import { describe, expect, it} from "vitest";
import { createCube } from "../../src/cube/Cube";
import { findOptimalSequence } from "../../src/solvers/Finders";
import { isCubeSolved } from "../../src/analyzers/CommonAnalyzers";
import { LAYER_MOVES_ARRAY, R_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE } from "../../src/cube/moves";
import { createCubeState } from "../Utils";
import { getNotationFromMove } from "../../src/cube/Notation";

describe("findOptimalSequence", () => {
    it("Should return 0 moves to cube solved condition", () => {
        const solvedCube = createCube();
        const sequence = findOptimalSequence({
            condition: isCubeSolved,
            cubeStateNode: solvedCube,
            possibleMoves: LAYER_MOVES_ARRAY,
            depth: 3
        });
        expect(sequence).toEqual([]);
    });
    it("Should return 1 move to cube solved condition", () => {
        const cube = createCubeState([U_CLOCKWISE_MOVE]);
        const sequence = findOptimalSequence({
            condition: isCubeSolved,
            cubeStateNode: cube,
            possibleMoves: LAYER_MOVES_ARRAY,
            depth: 3
        });
        console.log("Found Sequence!!!", sequence?.map(getNotationFromMove));
        expect(sequence!.length).toEqual(1);
    });
    it("Should return 3 move to cube solved condition", () => {
        const cube = createCubeState([R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE]);
        const sequence = findOptimalSequence({
            condition: isCubeSolved,
            cubeStateNode: cube,
            possibleMoves: LAYER_MOVES_ARRAY,
            depth: 3
        });
        expect(sequence!.length).toEqual(3);
    });
});

describe("findOptimalBottomCross", () => {
})