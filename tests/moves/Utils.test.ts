import { describe, it, expect } from "vitest";
import { areMovesMirrored, D_CLOCKWISE_MOVE, D_COUNTER_CLOCKWISE_MOVE, mirrorMove, mirrorSequence, R_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, U_DOUBLE_MOVE } from "../../src/cube/moves";
import { areArraysEqual } from "../../src/Utils";
import { getNotationFromMove } from "../../src/cube/Notation";

describe("areMovesMirrored", () => {
    it("Should return true", () => {
        expect(areMovesMirrored(U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE)).toEqual(true);
        expect(areMovesMirrored(U_DOUBLE_MOVE, U_DOUBLE_MOVE)).toEqual(true);
    });
    it("Should return false", () => {
        expect(areMovesMirrored(U_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE)).toEqual(false);
        expect(areMovesMirrored(U_CLOCKWISE_MOVE, R_CLOCKWISE_MOVE)).toEqual(false);
        expect(areMovesMirrored(U_COUNTER_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE)).toEqual(false);
        expect(areMovesMirrored(U_COUNTER_CLOCKWISE_MOVE, R_CLOCKWISE_MOVE)).toEqual(false);
        expect(areMovesMirrored(U_DOUBLE_MOVE, U_CLOCKWISE_MOVE)).toEqual(false);
        expect(areMovesMirrored(U_DOUBLE_MOVE, U_COUNTER_CLOCKWISE_MOVE)).toEqual(false);
        expect(areMovesMirrored(U_DOUBLE_MOVE, R_CLOCKWISE_MOVE)).toEqual(false);
    })
})
describe("mirrorMove", () => {
    it("Should mirror a clockwise quarter move correctly", () => {
        const mirroredUClockwise = mirrorMove(U_CLOCKWISE_MOVE);
        expect(areArraysEqual(U_COUNTER_CLOCKWISE_MOVE, mirroredUClockwise)).toEqual(true);
    });
    it("Should mirror a counter clockwise quarter move correctly", () => {
        const mirroredUCounterClockwise = mirrorMove(U_COUNTER_CLOCKWISE_MOVE);
        expect(areArraysEqual(U_CLOCKWISE_MOVE, mirroredUCounterClockwise)).toEqual(true);
    });
    it("Should mirror a double move correctly", () => {
        const targetMove = U_DOUBLE_MOVE;
        const uDoubleMirrored = mirrorMove(U_DOUBLE_MOVE);
        console.log(getNotationFromMove(targetMove), getNotationFromMove(uDoubleMirrored));
        expect(areArraysEqual(targetMove, U_DOUBLE_MOVE)).toEqual(true);
    })
});

describe("mirrorSequence", () => {
    it("Should mirror a sequence", () => {
        const sequence = [R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, D_COUNTER_CLOCKWISE_MOVE];
        const expected = [D_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, R_COUNTER_CLOCKWISE_MOVE];
        const mirroredSequence = mirrorSequence(sequence);
        expect(expected).toEqual(mirroredSequence);
    }) 
})