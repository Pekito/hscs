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
    });

    it("Should perform a Sledge", () => {
        const cube = new RubiksCube();
        cube.rotateFrontClockwise();
        cube.rotateRightCounterClockwise();
        cube.rotateFrontCounterClockwise();
        cube.rotateRightClockwise();

        expect(cube.frontFace).toEqual(
            [
                ['W','W','Y'],
                ['G','G','G'],
                ['G','G','G']
            ]
        );
        expect(cube.leftFace).toEqual([
            ['O','O','B'],
            ['O','O','O'],
            ['O','O','O']
        ]);
        expect(cube.rightFace).toEqual([
            ['R','R','G'],
            ['W','R','R'],
            ['W','R','R']
        ]);
        expect(cube.backFace).toEqual([
            ['W','B','B'],
            ['B','B','B'],
            ['B','B','B']
        ]);
        expect(cube.bottomFace).toEqual([
            ['Y','Y','R'],
            ['Y','Y','Y'],
            ['Y','Y','Y']
        ]);
    });

    it("Should perform a D Layer Sexy Move", () => {
        const cube = new RubiksCube();
        cube.rotateRightCounterClockwise();
        cube.rotateBottomCounterClockwise();
        cube.rotateRightClockwise();
        cube.rotateBottomClockwise();

        expect(cube.upFace).toEqual([['W','W','W'],['W','W','W'],['W','W','R']]);
        expect(cube.frontFace).toEqual([['G','G','G'],['G','G','Y'],['G','G','W']]);
        expect(cube.leftFace).toEqual([['O','O','O'],['O','O','O'],['B','O','O']]);
        expect(cube.rightFace).toEqual([['Y','R','R'],['B','R','R'],['R','R','Y']]);
        expect(cube.backFace).toEqual([['B','B','B'],['B','B','B'],['B','R','R']]);
        expect(cube.bottomFace).toEqual([['Y','Y','G'],['Y','Y','G'],['Y','Y','O']]);
    });
    
    it("Should insert in the back-right slot", () => {
        const cube = new RubiksCube();
        cube.rotateBackClockwise();
        cube.rotateUpCounterClockwise();
        cube.rotateBackCounterClockwise();
        expect(cube.upFace).toEqual([['W','W','B'],['R','W','W'],['R','W','W']]);
        expect(cube.frontFace).toEqual([['W','O','O'],['G','G','G'],['G','G','G']]);
        expect(cube.leftFace).toEqual([['O','B','B'],['O','O','O'],['O','O','O']]);
        expect(cube.backFace).toEqual([['Y','B','B'],['R','B','B'],['R','B','B']]);
        expect(cube.rightFace).toEqual([['G','G','R'],['R','R','W'],['R','R','W']]);
        expect(cube.bottomFace).toEqual([['Y','Y','Y'],['Y','Y','Y'],['Y','Y','G']]);
    })
});

describe("Cloning", () => {
    it("Should clone without sharing reference", () => {
        const cube = new RubiksCube();

        const frontFaceFirstRow = cube.getRow(0,cube.frontFace);
        const frontFaceFirstColumn = cube.getColumn(0, cube.frontFace);
        cube.rotateUpClockwise();
        expect(frontFaceFirstRow).toEqual(['G','G','G']);
        expect(frontFaceFirstColumn).toEqual(['G','G','G']);
    })
})