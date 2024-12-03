import { describe, expect, it } from "vitest";
import { applySequence } from "../../src/cube/Notation";
import { createCube } from "../../src/cube/Cube";

describe("applySequence", () => {
    it("Should apply a sequence correctly", () => {
        const sequence = "R B F2 U R2 F2 R2 D U2 B2 D R2 B2 U' R F D' B' R2 B'";

        const scrambledCube = applySequence(createCube(), sequence);
        expect(scrambledCube).toEqual([
            9,  7, 18, 23,  4, 39, 20, 52, 17, 38, 30, 27,
           10, 13, 12, 35, 46, 26,  8, 43, 45, 41, 22, 16,
           33, 34, 36, 24, 32,  6, 48, 31, 14, 29,  1, 51,
           11, 19,  0, 21, 40,  3, 44,  5, 53, 47, 50,  2,
           25, 49, 37, 42, 28, 15
         ])
    })
})