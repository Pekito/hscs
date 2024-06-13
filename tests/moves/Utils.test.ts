import { describe, it, expect } from "vitest";
import { areMovesMirrored, R_CLOCKWISE_MOVE, U_CLOCKWISE_MOVE, U_COUNTER_CLOCKWISE_MOVE, U_DOUBLE_MOVE } from "../../src/cube/moves";

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