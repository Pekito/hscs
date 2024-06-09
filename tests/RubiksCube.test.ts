import { describe, expect, it } from "vitest";
import { RubiksCube } from "../src/RubiksCube";

describe("Rotation", () => {
    it("Should perform a Right Up Right", () => {
        const cube = new RubiksCube();
        cube.rotateRightClockwise();
        cube.rotateUpClockwise();
        cube.rotateRightClockwise();
        expect(cube.frontFace).toEqual([
            ['R','R','B'],
            ['G','G','B'],
            ['G','G','B']
        ]);
        expect(cube.upFace).toEqual([
            ['W','W','R'],
            ['W','W','Y'],
            ['G','G','Y']
        ]);
        expect(cube.backFace).toEqual([
            ['G','O','O'],
            ['W','B','B'],
            ['W','B','B']
        ]);
        expect(cube.bottomFace).toEqual([
            ['Y','Y','W'],
            ['Y','Y','W'],
            ['Y','Y','O']
        ]);
    })
})